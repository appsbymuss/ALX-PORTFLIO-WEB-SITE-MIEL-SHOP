const express = require('express');
const router = express.Router();
const couponController = require('../../controller/business-logic/coupon.controller');
const { authorize } = require('../../middleware/authorization');
const { body } = require('express-validator');

router.get('/coupons',
    authorize(["admin"]),
couponController.getCoupons)

router.post('/coupons',
    authorize(["admin"]),
    [
        body("type").isIn(["product", "order"]),
        body("id_product").if(body("type").equals("product")).isInt().notEmpty(),
    ],
couponController.createCoupon);

router.get('/coupons/:id',
    authorize(["admin"]),
couponController.getCouponById);

router.post('/check-coupon',
    authorize(["user"]),
couponController.checkCoupon);

router.put('/coupons/:id',
    authorize(["admin"]),
    [
        body("type").isIn(["product", "order"]),
        body("id_product").if(body("type").equals("product")).isInt().notEmpty(),
    ],
couponController.updateCoupon);

router.delete('/coupons/:id',
    authorize(["admin"]),
couponController.deleteCoupon);

module.exports = router;