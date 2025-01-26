const stripe = require('stripe');
const paymentModel = require('../../model/payment.model');
const orderModel = require('../../model/order.model');
const deliveryModel = require('../../model/delivery.model');
const factureModel = require('../../model/facture.model');
const MondialRelay = require('../../dist/utils/shipping/services/mondial-relay-class/mondialRelay');

const { sendAdminsNotification } = require('../../utils/notifications/push');

const { sendOrderConfirmation } = require('../../utils/mail/mailer');


const paginate = require('../../utils/misc/pagination');

const stripeInit = stripe(process.env.STRIPE_PRIVATE_KEY);



async function handleCheckout(data) {
    try {
        let total_TVA = 0;

        let items = (data.order_items.map((val, i) => {
            total_TVA += val.TVA
            return {
                price_data: {
                    currency: 'eur',
                    product_data: {
                        name: val.product.name,
                        description: val.product.description,
                        ...((val.product.image_url) ? {images: [val.product.image_url]} : {})
                    },
                    unit_amount: parseInt((parseFloat(val.product.price) * 100).toFixed(2)),
                },
                quantity: val.quantity,
                //TODO: tax_rates: ["txr_1OvttmHyM31eaPbWOvjsMVUb"]
            }
        }));

        // TODO: Shipping fees applied (find STRIPE API Documentation for that)
        items.push({
            price_data: {
                currency: 'eur',
                product_data: {
                    name: "Shipping",
                    description: "Shipping fees"
                },
                unit_amount: parseInt(data.LivraisonTarif * 100),
            },
            quantity: 1,
        })

        // TODO: Taxes Applied (find STRIPE API Documentation for that)
        items.push({
            price_data: {
                currency: 'eur',
                product_data: {
                    name: "Total Taxes",
                    description: "Total TVA taxes appliquée sur les produits"
                },
                unit_amount: parseInt(data.order_items.reduce((accumulator, currentValue) => accumulator + currentValue.TVA, 0) * 100)
            },
            quantity: 1
        })

        // TODO: Figure out a way to add the tax (see your phone gallery)

        const session = await stripeInit.checkout.sessions.create({
            // TODO: Think more of The Accepted Methods
            payment_method_types: ["card", "paypal"],
            mode: "payment",
            line_items: items,
            // This will be left on the TEMPORARY metadata
            success_url: process.env.PAY_SUCCESS_URL,
            cancel_url: process.env.PAY_CANCEL_URL,
            metadata: {
                order_id: data.id,
                user_id: data.user_id,
                weight: data.weight,
                deliveryMethod: data.deliveryMethod.modeLiv,
                factureID: data.factureID
            },
            // This will be left on the REAL metadata
            payment_intent_data: {
                metadata: {
                  deliveryMethod: data.deliveryMethod.modeLiv,
                  deliveryRelayCountryCode: data.deliveryMethod.countryCode || '',
                  deliveryRelayPostalCode: data.deliveryMethod.codePostal || '',
                  deliveryRelayNumber: data.deliveryMethod.relayNumber || '',
                  factureID: data.factureID
                }
            }
        });

        return {"payment_link": session.url};
    } catch (err) {
        console.error(err);
    }
}

async function handleSuccessCheckoutWH(req, res) {
    const sig = req.headers['stripe-signature'];
  
    let event;
  
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
        // Handle the event
        switch (event.type) {
            case 'checkout.session.completed':
                const checkoutSessionCompleted = event.data.object;
                await paymentModel.applyPayment(checkoutSessionCompleted);
                await orderModel.getOrderById(
                    parseInt(checkoutSessionCompleted.metadata.order_id)
                );
                
                return res.sendStatus(200);
                // TODO: Handle Refund
            default:
                console.log(`Unhandled event type ${event.type}`);
        }
    } catch (err) {
        console.log(err);
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }
    // Return a 200 response to acknowledge receipt of the event
    res.sendStatus(200);
}

// TODO: Add more code to these two methods...
async function handleSuccessCheckout(req, res) {
    return res.redirect("https://www.lemiel.shop");
}

async function handleCancelCheckout(req, res) {
    return res.redirect("https://www.lemiel.shop");
}

async function getAllPayments(req, res) {
    let payments = {};
      try {
        const { page = 1, max_items = 10 } = req.query;
    
        let filter = {};
    
        const pagination = {
          skip: (parseInt(page) - 1) * parseInt(max_items),
          take: parseInt(max_items)
        };
    
        const totalCount = await paymentModel.getPaymentsCount(filter);
    
        payments.paginate = paginate(totalCount, parseInt(page), parseInt(max_items));
    
        payments.data = await paymentModel.getAllPayments(filter, pagination);
    
        return res.status(200).json(payments);
      } catch (error) {
        console.error(error);
        res.status(500).json({"error": "Internal Server Error"});
      }
}

module.exports = {
    handleCheckout,
    handleSuccessCheckoutWH,
    handleSuccessCheckout,
    handleCancelCheckout,
    getAllPayments
}