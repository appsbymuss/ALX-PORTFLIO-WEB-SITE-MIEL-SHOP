const { validationResult } = require('express-validator');
const categoryModel = require('../../model/category.model');
const cloudinary = require('../../utils/files_cloud/cloudinary');
const paginate = require('../../utils/misc/pagination');

async function getCategories(req, res) {
  try {
    const { page = 1, max_items = 10 } = req.query;

    let categories = {};

    const filter = {};
    
    const pagination = {
      skip: (parseInt(page) - 1) * parseInt(max_items),
      take: parseInt(max_items)
    };

    const count = await categoryModel.getCategoriesCount(filter);

    categories.paginate = paginate(count, page, max_items);

    categories.data = await categoryModel.getCategories(filter, pagination);

    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({"error": "Internal Server Error"});
  }
}

async function createCategory(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: errors.array() });
    }

    let category = await categoryModel.createCategory(req.body);
  
    if (req.file)
    {
      category.image_path = req.file.path;
      const fileUpResponse = await cloudinary.uploadImage(req.file.path);
      if (fileUpResponse) {
        category.image_url = fileUpResponse.secure_url;
        console.log(fileUpResponse);
      }
      category = await categoryModel.updateCategory(category.id, category);
    }
  
    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({error:'Internal Server Error'});
  }
}

async function getCategoryById(req, res) {
  const categoryId = parseInt(req.params.id, 10);
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: errors.array() });
    }
    const category = await categoryModel.getCategoryById(categoryId);
    if (!category) {
      res.status(404).json({error:'Category not found'});
    } else {
      res.json(category);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({error:'Internal Server Error'});
  }
}

async function updateCategory(req, res) {
  const categoryId = parseInt(req.params.id, 10);
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: errors.array() });
    }
    let updatedCategory = await categoryModel.updateCategory(categoryId, req.body);

    if (req.file)
    {
      updatedCategory.image_path = req.file.path;
      const fileUpResponse = await cloudinary.uploadImage(req.file.path);
      if (fileUpResponse) {
        updatedCategory.image_url = fileUpResponse.secure_url;
        console.log(fileUpResponse);
      }
      updatedCategory = await categoryModel.updateCategory(updatedCategory.id, updatedCategory);
    }

  
    if (!updatedCategory) {
      res.status(404).json({error:'Category not found'});
    } else {
      res.json(updatedCategory);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({error:'Internal Server Error'});
  }
}

async function deleteCategory(req, res) {
  const categoryId = parseInt(req.params.id, 10);
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: errors.array() });
    }
    const deletedCategory = await categoryModel.deleteCategory(categoryId);
    if (!deletedCategory) {
      res.status(404).json({error:'Category not found'});
    } else {
      res.json(deletedCategory);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({error:'Internal Server Error'});
  }
}

module.exports = {
  getCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
