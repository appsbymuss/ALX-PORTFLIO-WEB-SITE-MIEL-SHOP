const express = require('express');
const router = express.Router();
const addressController = require('../../controller/business-logic/address.controller');
const { body, param } = require('express-validator');
const { authorize } = require('../../middleware/authorization');

// APPLY ON ALL OF THEM
// ->
// THAT YOU CAN ONLY MANIPULATE (UPDATE, DELETE)
// THE ADDRESSES THAT ARE ALREADY OWNED BY SAME USER (user: self)

router.get('/addresses', authorize(["user"]), 
    addressController.getAddresses);

router.post('/addresses', authorize(["user"]), [
    body('countryCode').isString().notEmpty(),
    body('city').isString().notEmpty(),
    body('province').isString(),
    body('postalCode').isString().notEmpty(),
    body('streetAddress').isString().notEmpty(),
    body('streetAddress2').isString()
], addressController.createAddress);

router.get('/addresses/:id', authorize(["user"]), [
    param("id").isInt()
], addressController.getAddressById);

router.put('/addresses/:id', authorize(["user"]), [
    body('countryCode').isString(),
    body('city').isString(),
    body('province').isString(),
    body('postalCode').isString(),
    body('streetAddress').isString(),
    body('streetAddress2').isString()
], addressController.updateAddress);

router.delete('/addresses/:id', authorize(["user"]), [
    param("id").isInt(),
], addressController.deleteAddress);

module.exports = router;