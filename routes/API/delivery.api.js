const express = require('express');
const router = express.Router();
const shippingController = require('../../controller/business-logic/shipping.controller');
const deliveryController = require('../../controller/business-logic/delivery.controller');
const { authorize } = require('../../middleware/authorization');
const { body } = require('express-validator');

router.get('/deliveries',
    authorize(["admin"]),
deliveryController.getDeliveries
)

router.post('/delivery/mondialrelay/getquote',
authorize(["user", "admin"]),
    [
        body('countryCode').isString().matches(/^[A-Z]{2}$/),
        body('streetAddress').isString().matches(/^.{0,32}$/),
        body('streetAddress2').isString().matches(/^.{0,32}$/),
        body('city').isString().matches(/^.{0,32}$/),
        body('postalCode').isString().matches(/^[0-9]{5}$/),
        body('modeLiv').isString().matches(/^[0-9]{5}$/),
        body('relayNumber').if(body("modeLiv").equals("24R")).isString().matches(/^[0-9]{5}$/),
        body('livCountryCode').if(body("modeLiv").equals("24R")).isString().matches(/^(|[0-9]{6})$/),
        body('package_weight').isInt(),
    ],
shippingController.getShippingCostsMR);


router.post('/delivery/mondialrelay/getnearbyrelays',
    authorize(["user", "admin"]),
    [
        body('pays').isString().matches(/^[A-Z]{2}$/),
        body('ville').isString().matches(/^.{0,32}$/),
        body('CP').isString().matches(/^[0-9]{5}$/),
        body('type').isString().optional(),
    ],
shippingController.getPointsRelaysNearbyMR);

module.exports = router;