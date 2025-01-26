const stockModel = require('../../model/stock.model');

async function getAllStocks(req, res) {
  try {
    const stock = await stockModel.getStocks();
    res.status(200).json(stock);
  } catch (err) {
    console.log(err);
    res.status(500).json({error:'Internal Server Error'})
  }
}

async function createStock(req, res) {
  try {
    const stock = await stockModel.createStock(req.body);
    res.status(201).json(stock);
  } catch (error) {
    console.error(error);
    res.status(500).json({error:'Internal Server Error'});
  }
}

async function getStockById(req, res) {
  const stockId = parseInt(req.params.id, 10);
  try {
    const stock = await stockModel.getStockById(stockId);
    if (!stock) {
      res.status(404).json({error:'Stock not found'});
    } else {
      res.json(stock);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({error:'Internal Server Error'});
  }
}

async function updateStock(req, res) {
  const stockId = parseInt(req.params.id, 10);
  try {
    const updatedStock = await stockModel.updateStock(stockId, req.body);
    if (!updatedStock) {
      res.status(404).json({error:'Stock not found'});
    } else {
      res.json(updatedStock);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({error:'Internal Server Error'});
  }
}

async function deleteStock(req, res) {
  const stockId = parseInt(req.params.id, 10);
  try {
    const deletedStock = await stockModel.deleteStock(stockId);
    if (!deletedStock) {
      res.status(404).json({error:'Stock not found'});
    } else {
      res.json(deletedStock);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({error:'Internal Server Error'});
  }
}

module.exports = {
  getAllStocks,
  createStock,
  getStockById,
  updateStock,
  deleteStock,
};
