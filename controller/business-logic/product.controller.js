const { validationResult } = require('express-validator');
const productModel = require('../../model/product.model');
const paginate = require('../../utils/misc/pagination');
const cloudinary = require('../../utils/files_cloud/cloudinary');

async function getProductsMinimalInfo(req, res) {
  let products = {};
  try {
    const { name, priceMin, priceMax, categoryIds, brandIds, page = 1, max_items = 10 } = req.query;

    let filter = {};

    if (priceMin !== undefined && priceMax !== undefined) {
      filter.price = {
        gte: parseFloat(priceMin),
        lte: parseFloat(priceMax),
      };
    }

    if (categoryIds !== undefined && categoryIds.length > 0) {
      const categoryIdsArray = categoryIds.split(',').map(Number);
      filter.category_id = {
        in: categoryIdsArray,
      };
    }

    if (brandIds !== undefined && brandIds.length > 0) {
      const brandIdsArray = brandIds.split(',').map(Number);
      filter.brand_id = {
        in: brandIdsArray,
      };
    }

    if (name !== undefined && name.length > 0) {
      filter.name = {
        "startsWith": name
      }
    }

    const pagination = {
      skip: (parseInt(page) - 1) * parseInt(max_items),
      take: parseInt(max_items)
    };

    const count = await productModel.getProductsCount(filter);

    products.paginate = paginate(count, page, max_items);

    products.data = await productModel.getProductsMinimalInfo(filter, pagination);

    return res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({"error": "Internal Server Error"});
  }
}

async function getProducts(req, res) {
  let products = {};
  try {
    const { name, priceMin, priceMax, categoryIds, brandIds, page = 1, max_items = 10 } = req.query;

    let filter = {};

    if (priceMin !== undefined && priceMax !== undefined) {
      filter.price = {
        gte: parseFloat(priceMin),
        lte: parseFloat(priceMax),
      };
    }

    if (categoryIds !== undefined && categoryIds.length > 0) {
      const categoryIdsArray = categoryIds.split(',').map(Number);
      filter.category_id = {
        in: categoryIdsArray,
      };
    }

    if (brandIds !== undefined && brandIds.length > 0) {
      const brandIdsArray = brandIds.split(',').map(Number);
      filter.brand_id = {
        in: brandIdsArray,
      };
    }

    if (name !== undefined && name.length > 0) {
      filter.name = {
        "startsWith": name
      }
    }

    const pagination = {
      skip: (parseInt(page) - 1) * parseInt(max_items),
      take: parseInt(max_items)
    };

    const count = await productModel.getProductsCount(filter);

    products.paginate = paginate(count, page, max_items);

    products.data = await productModel.getProducts(filter, pagination);

    return res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({"error": "Internal Server Error"});
  }
}

async function createProduct(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: errors.array() });
    }

    let product_last = await productModel.createProduct(req.body);

    if (req.file)
    {
      product_last.image_path = req.file.path;
      const fileUpResponse = await cloudinary.uploadImage(req.file.path);
      if (fileUpResponse) {
        product_last.image_url = fileUpResponse.secure_url;
        console.log(fileUpResponse);
      }
      product_last = await productModel.updateProduct(product_last.id, product_last);
    }

    console.log(product_last);
  
    res.status(201).json(product_last);
  } catch (error) {
    console.error(error);
    res.status(500).json({error:'Internal Server Error'});
  }
}

async function getProductById(req, res) {
  const productId = parseInt(req.params.id, 10);
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: errors.array() });
    }
    const product = await productModel.getProductById(productId);
    if (!product) {
      res.status(404).json({error:'Product not found'});
    } else {
      res.json(product);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({error:'Internal Server Error'});
  }
}

async function updateProduct(req, res) {
  const productId = parseInt(req.params.id, 10);
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: errors.array() });
    }
    
    let updatedProduct = await productModel.updateProduct(productId, req.body);

    if (req.file)
    {
      updatedProduct.image_path = req.file.path;
      const fileUpResponse = await cloudinary.uploadImage(req.file.path);
      if (fileUpResponse) {
        updatedProduct.image_url = fileUpResponse.secure_url;
        console.log(fileUpResponse);
      }
      updatedProduct = await productModel.updateProduct(updatedProduct.id, updatedProduct);
    }

    if (!updatedProduct) {
      res.status(404).json({error:'Product not found'});
    } else {
      res.json(updatedProduct);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({error:'Internal Server Error'});
  }
}

async function deleteProduct(req, res) {
  const productId = parseInt(req.params.id, 10);
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: errors.array() });
    }
    const deletedProduct = await productModel.deleteProduct(productId);
    if (!deletedProduct) {
      res.status(404).json({error:'Product not found'});
    } else {
      res.json(deletedProduct);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({error:'Internal Server Error'});
  }
}

module.exports = {
  getProducts,
  getProductsMinimalInfo,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
