const express = require('express');
const router = express.Router();
const orderController = require('../../controller/business-logic/order.controller');
const { authorize } = require('../../middleware/authorization');
const { body, param } = require('express-validator');

router.get('/orders',
    authorize(["admin"]),
orderController.getOrders);

router.post('/orders',
    authorize(["user"]),
    [
        body("id_address").isInt(),
        body("couponCode").optional().isString(),
        body("modeLiv").isString().isIn(["HOM", "24R"]),
        body("relayNumber").if(body("modeLiv").equals("24R")).isString().notEmpty(),
        body("relayCountryCode").if(body("modeLiv").equals("24R")).isString().notEmpty().matches(/^[A-Z]{2}$/),
        body("relayCodePostal").if(body("modeLiv").equals("24R")).isString().notEmpty(),
    ],
orderController.createOrder);

// TODO: You should only allow if the user == user with the order
router.get('/orders/:id',
    authorize(["user", "admin"]),
orderController.getOrderById);

// TODO: Need to review these fields and their EXPECTED formats
router.post('/orders/:id/confirm',
    authorize(["admin"]),
    [
        param("id").isInt().notEmpty().toInt(),

        body("client.user.firstName").isString().notEmpty(),
        body("client.user.lastName").isString().notEmpty(),
        body("client.user.gender").isString().isIn(["M", "F", "autre", "nonSpecifie"]),
        body("client.user.numberPhone").isString().notEmpty(),
        body("client.user.email").optional().isEmail(),

        body("client.address.countryCode").isString().matches(/^[A-Z]{2}$/),
        body("client.address.streetAddress").isString().matches(/^.{0,32}$/),
        body("client.address.streetAddress2").isString().matches(/^.{0,32}$/),
        body("client.address.city").isString().matches(/^.{0,32}$/),
        body("client.address.postalCode").isString().matches(/^[0-9]{5}$/),
        
        // TODO: Add a way for the admin to select the Relay he wants (from where he sends)

        /**
         * TODO: YOU NEED TO MAKE THE VALUES OF THE ADMIN DYNAMIC
         */

        body("admin.user.firstName").isString().notEmpty(),
        body("admin.user.lastName").isString().notEmpty(),
        body("admin.user.gender").isString().isIn(["M", "F", "autre", "nonSpecifie"]),
        body("admin.user.numberPhone").isString().notEmpty(),
        body("admin.user.email").isEmail().optional(),

        body("admin.address.countryCode").isString().matches(/^[A-Z]{2}$/),
        body("admin.address.streetAddress").isString().matches(/^.{0,32}$/),
        body("admin.address.streetAddress2").isString().matches(/^.{0,32}$/),
        body("admin.address.city").isString().matches(/^.{0,32}$/),
        body("admin.address.postalCode").isString().matches(/^[0-9]{5}$/),

        body("shippingInfo.modeLiv").isString().isIn(["HOM", "24R"]),

        // COLLECTION INFO:
        body("shippingInfo.colRelayNumber").isString().notEmpty(),
        body("shippingInfo.colCountryCode").isString().notEmpty(),

        // RELAY LIVRAISON (optional) INFO
        body("shippingInfo.relayNumber").if(body("modeLiv").equals("24R")).isString().notEmpty(),
        body("shippingInfo.livCountryCode").if(body("modeLiv").equals("24R")).isString().notEmpty(),
        body("shippingInfo.package_weight").isNumeric().notEmpty().toInt(),

        body("items").isArray(),
        body('items.*.product_id').isInt().withMessage('product_id must be an integer').toInt(),
        body('items.*.stock_id').isInt().withMessage('stock_id must be an integer').toInt(),
        body('items.*.quantity').isInt().withMessage('quantity must be an integer').toInt(),

        body("order.factureID").isString().notEmpty()
    ],
orderController.confirmOrder);

router.put('/orders/:id',
    authorize(["user"]),
orderController.updateOrder);

router.delete('/orders/:id',
    authorize(["user"]),
orderController.deleteOrder);

// TODO: create a /order/cancel to cancel an order

module.exports = router;