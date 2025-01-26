const express = require('express');
const router = express.Router();
const stockController = require('../../controller/business-logic/stock.controller');
const { authorize } = require('../../middleware/authorization');

router.get('/stocks',
    authorize(["admin"]),
stockController.getAllStocks);
router.post('/stocks',
    authorize(["admin"]),
stockController.createStock);

router.get('/stocks/:id',
    authorize(["admin"]),
stockController.getStockById);

router.put('/stocks/:id',
    authorize(["admin"]),
stockController.updateStock);

router.delete('/stocks/:id',
    authorize(["admin"]),
stockController.deleteStock);

module.exports = router;