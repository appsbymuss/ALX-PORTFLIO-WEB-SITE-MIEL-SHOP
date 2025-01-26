const express = require('express');
const router = express.Router();
const categoryController = require('../../controller/business-logic/category.controller');
const fileUploadMiddleware = require('../../middleware/fileUploading');
const { authorize } = require('../../middleware/authorization');
const { body } = require('express-validator');

router.get('/categories', categoryController.getCategories);

router.post('/categories',[
    authorize(["admin"]),
    fileUploadMiddleware.upload.single('image'),
    [
        body('name').isString().notEmpty(),
        body('description').optional().isString()
    ],
],categoryController.createCategory);

router.get('/categories/:id', categoryController.getCategoryById);

router.put('/categories/:id',[
    authorize(["admin"]),
    fileUploadMiddleware.upload.single('image'),
    [
        body('name').isString().notEmpty(),
        body('description').optional().isString()
    ],
],categoryController.updateCategory);

router.delete('/categories/:id', 
    authorize(["admin"]),
categoryController.deleteCategory);

module.exports = router;