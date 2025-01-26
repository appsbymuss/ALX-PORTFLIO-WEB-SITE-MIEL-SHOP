// ?? Cancel & Confirm
const express = require('express');
const router = express.Router();
const paymentController = require('../../controller/business-logic/payment.controller');
const { authorize } = require('../../middleware/authorization');

router.get('/payments',
    authorize(["admin"]),
paymentController.getAllPayments);

router.get('/checkout/success', paymentController.handleSuccessCheckout);

router.get('/checkout/cancel', paymentController.handleCancelCheckout);

module.exports = router;