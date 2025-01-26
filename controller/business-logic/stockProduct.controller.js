const stockProductModel = require('../../model/stockProduct.model');
const { validationResult } = require('express-validator');

async function getAllStockProductsByStockID(req, res) {
  const { stockID } = req.query;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: errors.array() });
    }
    const filter = { stock_id: parseInt(stockID) }
    const stockProduct = await stockProductModel.getStockProducts(filter);
    res.status(201).json(stockProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({error:'Internal Server Error'});
  }
}

async function getAllStockProductsByProductID(req, res) {
    const { productID } = req.query;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: errors.array() });
    }
    const filter = { product_id: parseInt(productID) }
    const stockProduct = await stockProductModel.getStockProducts(filter);
    res.status(201).json(stockProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({error:'Internal Server Error'});
  }
}

async function createStockProduct(req, res) {
  try {
    const stockProduct = await stockProductModel.createStockProduct(req.body);
    res.status(201).json(stockProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({error:'Internal Server Error'});
  }
}

async function getStockProductById(req, res) {
  const stockProductId = parseInt(req.params.id, 10);
  try {
    const stockProduct = await stockProductModel.getStockProductById(stockProductId);
    if (!stockProduct) {
      res.status(404).json({error:'stockProduct not found'});
    } else {
      res.json(stockProduct);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({error:'Internal Server Error'});
  }
}

async function updateStockProduct(req, res) {
  const stockProductId = parseInt(req.params.id, 10);
  try {
    const updatedStockProduct = await stockProductModel.updateStockProduct(stockProductId, req.body);
    if (!updatedStockProduct) {
      res.status(404).json({error:'StockProduct not found'});
    } else {
      res.json(updatedStockProduct);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({error:'Internal Server Error'});
  }
}

async function deleteStockProduct(req, res) {
  const stockProductId = parseInt(req.params.id, 10);
  try {
    const deletedStockProduct = await stockProductModel.deleteStockProduct(stockProductId);
    if (!deletedStockProduct) {
      res.status(404).json({error:'StockProduct not found'});
    } else {
      res.json(deletedStockProduct);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({error:'Internal Server Error'});
  }
}

module.exports = {
  getAllStockProductsByStockID,
  getAllStockProductsByProductID,
  createStockProduct,
  getStockProductById,
  updateStockProduct,
  deleteStockProduct,
};
