const express = require('express');
const router = express.Router();
const stockProductController = require('../../controller/business-logic/stockProduct.controller');
const { authorize } = require('../../middleware/authorization');
const { query } = require('express-validator');

router.get('/stockProducts',
    authorize(["admin"]),
    query("stockID").isInt(),
stockProductController.getAllStockProductsByStockID);

router.get('/stockProductsP',
    authorize(["admin"]),
    query("productID").isInt(),
stockProductController.getAllStockProductsByProductID);

router.post('/stockProducts',
    authorize(["admin"]),
stockProductController.createStockProduct);

router.get('/stockProducts/:id',
    authorize(["admin"]),
stockProductController.getStockProductById);

router.put('/stockProducts/:id',
    authorize(["admin"]),
stockProductController.updateStockProduct);

router.delete('/stockProducts/:id',
    authorize(["admin"]),
stockProductController.deleteStockProduct);

module.exports = router;