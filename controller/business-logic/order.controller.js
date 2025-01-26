const orderModel = require('../../model/order.model');
const productModel = require('../../model/product.model');
const couponModel = require('../../model/coupon.model');
const addressModel = require('../../model/address.model');
const deliveryModel = require('../../model/delivery.model');

const stripe = require('stripe');
const stripeInit = stripe(process.env.STRIPE_PRIVATE_KEY);

const { handleCheckout } = require('./payment.controller');
const MondialRelay = require('../../dist/utils/shipping/services/mondial-relay-class/mondialRelay');
const { createFacture } = require('../../model/facture.model');
const generateInvoice_excel = require('../../utils/facturation');
const generateInvoice_pdf = require('../../utils/facturation/node_t');
const { sendOrderConfirmation } = require('../../utils/mail/mailer');
const { validationResult } = require('express-validator');

function calculateOrderNet(order, chargesVariable) {
  // let total = 0;
  let i = 0;
  for (let order_item of order.order_item) {
    chargesVariable.order_items[i].product.base_price = chargesVariable.order_items[i].product.price;
    chargesVariable.order_items[i].total = (order_item.quantity * order_item.product.price)
    // total += chargesVariable.order_items[i].total;
    i++;
  }
  // chargesVariable.total = total;
}

async function calculateAndApplyTVA(chargesVariable) {
  let i = 0;
  // let total = 0;
  for (let order_item of chargesVariable.order_items) {
    const tva_percentage = await productModel.getProductTVAById(order_item.id_product);
    console.log(tva_percentage);
    if (!tva_percentage)
      return;

      // teee
    // Get Montant of TVA, get only 2 decimal points (gives a string) => turn to Float
    chargesVariable.order_items[i].TVA_perc = tva_percentage;
    chargesVariable.order_items[i].TVA = (order_item.total * (tva_percentage / 100));
    chargesVariable.order_items[i].TVA_UNIT = ((tva_percentage / 100) * (order_item.total / order_item.quantity))
    chargesVariable.order_items[i].total += chargesVariable.order_items[i].TVA;
    // total += chargesVariable.order_items[i].total;
    i++;
  }
  // chargesVariable.total = parseFloat(parseFloat(total).toFixed(2));
}

function calculateCoupon(couponObject, charges) {
  charges.order_items.map((item, i) => {
    if (coupon.type === "product") {
      // If Coupon is of type "Product"
      changedCharges.couponType = "Product"

      if (item.id_product == coupon.id_product)
      {
        changedCharges.order_items[i].couponApplied = coupon.couponCode;
        changedCharges.order_items[i].couponPercentage = coupon.percentage;
        changedCharges.order_items[i].reducedRemise = ((coupon.percentage / 100) * item.product.price);
        changedCharges.order_items[i].product.price = item.product.price - ((coupon.percentage / 100) * item.product.price);
        changedCharges.order_items[i].total = item.total - ((coupon.percentage / 100) * item.total);
      }
    } else {
      // If Coupon is of type "Order"
      changedCharges.couponType = "Order"

      changedCharges.order_items[i].couponApplied = coupon.couponCode;
      changedCharges.order_items[i].couponPercentage = coupon.percentage;
      changedCharges.order_items[i].reducedRemise = ((coupon.percentage / 100) * item.product.price);
      changedCharges.order_items[i].product.price = item.product.price - ((coupon.percentage / 100) * item.product.price);
      changedCharges.order_items[i].total = item.total - ((coupon.percentage / 100) * item.total);
    }
  });
}

async function applyCoupon(coupon, charges) {
  let changedCharges = charges;
  if (coupon) {
    coupon = await couponModel.isCouponValid(coupon);
    if (coupon)
    {
      changedCharges.order_items.map((item, i) => {
        if (coupon.type === "product") {
          // If Coupon is of type "Product"
          changedCharges.couponType = "Product"

          if (item.id_product == coupon.id_product)
          {
            changedCharges.order_items[i].couponApplied = coupon.couponCode;
            changedCharges.order_items[i].couponPercentage = coupon.percentage;
            changedCharges.order_items[i].reducedRemise = ((coupon.percentage / 100) * item.product.price);
            changedCharges.order_items[i].product.price = item.product.price - ((coupon.percentage / 100) * item.product.price);
            changedCharges.order_items[i].total = item.total - ((coupon.percentage / 100) * item.total);
          }
        } else {
          // If Coupon is of type "Order"
          changedCharges.couponType = "Order"

          changedCharges.order_items[i].couponApplied = coupon.couponCode;
          changedCharges.order_items[i].couponPercentage = coupon.percentage;
          changedCharges.order_items[i].reducedRemise = ((coupon.percentage / 100) * item.product.price);
          changedCharges.order_items[i].product.price = item.product.price - ((coupon.percentage / 100) * item.product.price);
          changedCharges.order_items[i].total = item.total - ((coupon.percentage / 100) * item.total);
        }
      })
      await couponModel.applyCoupon(coupon.id, changedCharges.id);
    }
  }
  charges = changedCharges;
}

async function getOrders(req, res) {
  let orders = {};
  try {
    const { page = 1, max_items = 10, status, orderByTime = 'desc' } = req.query;

    let filter = {};

    if (status && ["commande", "payee", "confirmee", "livrairee", "annuller"]
                  .includes(status))
    {
      filter.status = status
    }

    const pagination = {
      skip: (parseInt(page) - 1) * parseInt(max_items),
      take: parseInt(max_items),
      orderBy: {
        createdAt: orderByTime
      }
    };

    const totalCount = await orderModel.getOrdersCount(filter);
    const totalPages = Math.ceil(totalCount / max_items);
    const hasNextPage = (parseInt(page) < totalPages);
    const hasPreviousPage = (parseInt(page) > 1);

    orders.paginate = {
      total: totalCount,
      totalPages: totalPages,
      currentPage: parseInt(page),
      hasNextPage: hasNextPage,
      hasPreviousPage: hasPreviousPage
    };

    orders.data = await orderModel.getOrders(filter, pagination);

    return res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({error:`Internal Server Error:${error}`});
  }
}


async function createOrder(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: errors.array() });
    }
    const couponC = req.body.couponCode;
    let request_data = req.body;
    let modeLiv = req.body.modeLiv;
    let relayCountryCode = req.body.relayCountryCode;
    let relayCodePostal = req.body.relayCodePostal;
    let relayNumber = req.body.relayNumber;

    request_data.id_user = req.user.user_id;


    const order = await orderModel.createOrder(request_data);
    const specificOrder = await orderModel.getOrderById(order.id);
    
    const addressOfOrder = await addressModel.getAddressById(parseInt(req.body.id_address));
    if (!addressOfOrder || addressOfOrder.provided_by_user_id != specificOrder.id_user)
      return res.status(500).json({error:'Internal Server Error [address not found]'});

    const weight = specificOrder.order_item.reduce((accumulator, currentValue) => accumulator + (currentValue.product.weight * currentValue.quantity), 0);

    const livraisonTarif = MondialRelay.getQuote({
      countryCode: addressOfOrder.countryCode,
      modeLiv: modeLiv,
      package_weight: weight
    });

    const factureID = `${(new Date().getFullYear())}${(new Date()).getMonth()}${(new Date()).getDate()}${(new Date()).getHours()}${(new Date()).getMinutes()}${(new Date()).getSeconds()}_COMPANYCODE`;
    
    let charges = {
      user_id: req.user.user_id,
      id: specificOrder.id,
      order_items: specificOrder.order_item,
      deliveryMethod: {
        modeLiv,
        relayNumber,
        countryCode: relayCountryCode,
        codePostal: relayCodePostal
      },
      LivraisonTarif: livraisonTarif.total,
      factureID: factureID
    }


    calculateOrderNet(specificOrder, charges);


    if (couponC)
        await applyCoupon(couponC, charges);


    await calculateAndApplyTVA(charges);

    const CheckoutResult = await handleCheckout(charges);

    res.status(201).json({ charges, url: CheckoutResult.payment_link });
  } catch (error) {
    console.error(error);
    res.status(500).json({error:'Internal Server Error'});
  }
}

async function confirmOrder(req, res) {
  
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: errors.array() });
    }

    const orderId = parseInt(req.params.id, 10);
  
    const shippingInfo = req.body.shippingInfo;
    const clientUserInfo = req.body.client.user;
    const userAddressInfo = req.body.client.address;
  
    const itemsInfo = req.body.items;
    const orderInfo = req.body.order;

    // VERIFY THIS AND + ADD ITEMS (an array with its stockID)
    const shipMethodDesigniation = {
      "HOM": "DOMICILE",
      "24R": "RELAY"
    }

    let AllInfo = {
      ...shippingInfo,
      ...clientUserInfo,
      ...userAddressInfo,
      id_order: orderId
    }

    const MR_Object = new MondialRelay(AllInfo);
    const expeditionResult = await MR_Object.initiateExpedition();

    const delivery = await deliveryModel.createDelivery({
      serviceProvider: "mondialrelay",// TODO: Change this later to be more flexible to other delivery systems
      ExpeditionNum: expeditionResult.ExpeditionNum,
      shippingMethod: shipMethodDesigniation[shippingInfo.modeLiv],
      recipientDetails: req.body.client,
      senderDetails: req.body.admin,
      additionalDetails: shippingInfo,
      id_order: orderId
    });

    const specificOrder = await orderModel.getOrderById(orderId);

    const livraisonTarif = MondialRelay.getQuote({
      modeLiv: shippingInfo.modeLiv,
      countryCode: (shippingInfo.modeLiv == 'HOM') ? specificOrder.address.countryCode : shippingInfo.livCountryCode,
      package_weight: shippingInfo.package_weight
    }).total;
    
    let charges = {
      id: specificOrder.id,
      order_items: specificOrder.order_item,
      LivraisonTarif: livraisonTarif,
      factureID: orderInfo.factureID
    };

    calculateOrderNet(specificOrder, charges);

    if (specificOrder.applied_coupon[0])
      calculateCoupon(specificOrder.applied_coupon[0].coupon, charges);

    await calculateAndApplyTVA(charges);

    const totalExpenses = charges.order_items.reduce((accumulator, currentValue) => accumulator + currentValue.total, 0) + charges.LivraisonTarif;

    const factureParameters = {
      invoiceNumber: orderInfo.factureID,
      totalAmount: totalExpenses,
      paymentMethod: "paypal/card", // TODO: CHANGE THIS LATER IN DATABASE TABLE "PAYMENT"

      ...((specificOrder.applied_coupon[0]) ? {
        couponCode: specificOrder.applied_coupon[0].coupon.couponCode,
        couponCodeType: specificOrder.applied_coupon[0].coupon.type,
        couponCodeProductId: specificOrder.applied_coupon[0].coupon.id_product,
        couponRate: specificOrder.applied_coupon[0].coupon.percentage
      } : {}),

      shippingExpenses: livraisonTarif,
      order_id: orderId,
      user_id: specificOrder.id_user,
      delivery_id: delivery.id
    };
    
    const listOfProductFactures = itemsInfo.map((val, i) => {
      const specificProductInfo = charges.order_items.find((valI, iI) => val.product_id == valI.product.id);

      return {
        productDescription: specificProductInfo.product.name, // TODO: Does this need to change to description ??
        product_id: val.product_id,
        stock_id: val.stock_id,
        quantity: specificProductInfo.quantity,
        // TVA & Base-price
        unitPrice: specificProductInfo.product.price,
        tvaRate: specificProductInfo.TVA_perc,
        tvaTotal: specificProductInfo.TVA
      }
    });

    // ITEMS AND STOCK_IDs LEFT
    await createFacture(factureParameters, listOfProductFactures);

    await generateInvoice_excel({
      client: {
        ...clientUserInfo,
        ...userAddressInfo,
        user_id: specificOrder.id_user
      },
      shippingInfo: {
        ...shippingInfo,
        LivraisonTarif: livraisonTarif
      },
      items: charges.order_items,
      orderInfo: {
        factureID: orderInfo.factureID
      }
    });

    await generateInvoice_pdf(orderInfo.factureID);

    await sendOrderConfirmation(clientUserInfo.email, {}, orderInfo.factureID);

    return res.status(200).json({expeditionResult, charges});
  } catch (error) {
    console.log(error);
    return res.status(500).json({error:'Internal Server Error' + error});
  }
}

async function cancelOrder(req, res) {
  const orderId = parseInt(req.params.id, 10);
}

async function getOrderById(req, res) {
  const orderId = parseInt(req.params.id, 10);
  try {
    let order = await orderModel.getOrderById(orderId);

      if (!order) {
        return res.status(404).send('Order does not exist.');
      }

      if (req.user.role === 'admin' && order.payment) {
        const paymentMetadata = (await stripeInit.paymentIntents.retrieve(
          order.payment.paymentIntent
        )).metadata;
  
        order.payment.metadata = paymentMetadata;

        return res.json(order);
      }
    
      if (req.user.user_id !== order.id_user) {
        return res.status(403).send('You do not have access to this order.');
      }

      return res.json(order);
  } catch (error) {
    console.error(error);
    return res.status(500).json({error:'Internal Server Error'});
  }
}

async function updateOrder(req, res) {
  const orderId = parseInt(req.params.id, 10);
  try {
    const order = await orderModel.getOrderById(orderId);
    if (!order || req.user.user_id != order.id_user)
      return res.status(404).json({error:'Order not found'});
    const updatedOrder = await orderModel.updateOrder(orderId, req.body);
    if (!updatedOrder) {
      res.status(404).json({error:'Order not found'});
    } else {
      res.json(updatedOrder);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({error:'Internal Server Error'});
  }
}

async function deleteOrder(req, res) {
  const orderId = parseInt(req.params.id, 10);
  try {
    const order = await orderModel.getOrderById(orderId);
    if (!order || req.user.user_id != order.id_user)
      return res.status(404).json({error:'Order not found'});
  
    const deletedOrder = await orderModel.deleteOrder(orderId);
    if (!deletedOrder) {
      res.status(404).json({error:'Order not found'});
    } else {
      res.json(deletedOrder);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({error:'Internal Server Error'});
  }
}

module.exports = {
  getOrders,
  createOrder,
  getOrderById,
  confirmOrder,
  updateOrder,
  deleteOrder,
};
