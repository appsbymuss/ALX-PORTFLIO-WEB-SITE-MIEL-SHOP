const express = require('express');
const router = express.Router();
const productTypeController = require('../../controller/business-logic/producttype.controller');
const { authorize } = require('../../middleware/authorization');

router.get('/product-types', productTypeController.getProductTypes);

router.post('/product-types',
    authorize(["admin"]),
productTypeController.createProductType);

router.get('/product-types/:id',
    authorize(["admin"]),
productTypeController.getProductTypeById);

router.put('/product-types/:id',
    authorize(["admin"]),
productTypeController.updateProductType);

router.delete('/product-types/:id',
    authorize(["admin"]),
productTypeController.deleteProductType);

module.exports = router;