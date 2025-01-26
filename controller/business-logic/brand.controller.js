const { validationResult } = require('express-validator');
const brandModel = require('../../model/brand.model');

async function getBrands(req, res) {
  let brands = {}
  try {
    const { page = 1, max_items = 200 } = req.query;
    
    const filter = {};
    
    const pagination = {
      skip: (parseInt(page) - 1) * parseInt(max_items),
      take: parseInt(max_items)
    };

    brands.data = await brandModel.getBrands(filter, pagination);
    
    // brands.total_count = Math.ceil(brands.total_count / max_items);
    
    // [ ]: {"data": [table...]}
    res.status(200).json(brands);
  } catch (error) {
    console.error(error);
    res.status(500).json({"error": "Internal Server Error"});
  }
}

async function createBrand(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: errors.array() });
    }
    const brand = await brandModel.createBrand(req.body);
    res.status(201).json(brand);
  } catch (error) {
    console.error(error);
    res.status(500).json({error:'Internal Server Error'});
  }
}

async function getBrandById(req, res) {
  const brandId = parseInt(req.params.id, 10);
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: errors.array() });
    }
    const brand = await brandModel.getBrandById(brandId);
    if (!brand) {
      res.status(404).json({error:'Brand not found<'});
    } else {
      res.json(brand);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({error:'Internal Server Error'});
  }
}

async function updateBrand(req, res) {
  const brandId = parseInt(req.params.id, 10);
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: errors.array() });
    }
    const updatedBrand = await brandModel.updateBrand(brandId, req.body);
    if (!updatedBrand) {
      res.status(404).json({error:'Brand not found'});
    } else {
      res.json(updatedBrand);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({error:'Internal Server Error'});
  }
}

async function deleteBrand(req, res) {
  const brandId = parseInt(req.params.id, 10);
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: errors.array() });
    }
    const deletedBrand = await brandModel.deleteBrand(brandId);
    if (!deletedBrand) {
      res.status(404).json({error:'Brand not found'});
    } else {
      res.json(deletedBrand);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({error:'Internal Server Error'});
  }
}

module.exports = {
  getBrands,
  createBrand,
  getBrandById,
  updateBrand,
  deleteBrand,
};
