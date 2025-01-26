const productTypeModel = require('../../model/productType.model');

async function createProductType(req, res) {
  try {
    const productType = await productTypeModel.createProductType(req.body);
    res.status(201).json(productType);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getProductTypes(req, res) {
    try {
      const productTypes = await productTypeModel.getProductTypes();
        return res.json(productTypes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

async function getProductTypeById(req, res) {
  const productTypeId = parseInt(req.params.id, 10);
  try {
    const productType = await productTypeModel.getProductTypeById(productTypeId);
    if (!productType) {
      res.status(404).json({ error: 'Product Type not found' });
    } else {
      res.json(productType);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function updateProductType(req, res) {
  const productTypeId = parseInt(req.params.id, 10);
  try {
    const updatedProductType = await productTypeModel.updateProductType(productTypeId, req.body);
    if (!updatedProductType) {
      res.status(404).json({ error: 'Product Type not found' });
    } else {
      res.json(updatedProductType);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function deleteProductType(req, res) {
  const productTypeId = parseInt(req.params.id, 10);
  try {
    const deletedProductType = await productTypeModel.deleteProductType(productTypeId);
    if (!deletedProductType) {
      res.status(404).json({ error: 'Product Type not found' });
    } else {
      res.json(deletedProductType);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  createProductType,
  getProductTypeById,
  getProductTypes,
  updateProductType,
  deleteProductType,
};
