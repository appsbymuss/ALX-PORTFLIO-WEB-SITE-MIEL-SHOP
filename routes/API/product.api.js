const express = require('express');
const router = express.Router();
const productController = require('../../controller/business-logic/product.controller');
const fileUploadMiddleware = require('../../middleware/fileUploading');
const { authorize } = require('../../middleware/authorization');
const { body } = require('express-validator');

// Normal URI for Fetching Products
router.get('/products', productController.getProducts);

// Custom URI for Fetching Products (with only 'id' and 'name')
router.get('/products-minimal', productController.getProductsMinimalInfo);

// TODO: Make sure that in all middlewares to
// Apply 0th (AUTH_N/AUTH_Z)
// Apply 1st: Multer
// Apply 2nd...: Other Middlewares

router.post('/products', [
    authorize(["admin"]),
    fileUploadMiddleware.upload.single('image'),
    [
        body("name").isString().notEmpty(),
        body("description").isString().notEmpty(),
        body("price").isNumeric().notEmpty().toFloat(),
        body("priceBarre").isNumeric().notEmpty().toFloat(),
        body("category_id").isInt().notEmpty().toInt(),
        body("brand_id").isInt().notEmpty().toInt(),
        body("product_type_id").isInt().notEmpty().toInt(),
        body("weight").isInt().notEmpty().toInt(),
        body("rating").isInt({min: 1, max: 5}).toInt(),
        body("reviews").optional().isString(),
        body("origin").optional().isString(),
        body("texture").optional().isString(),
        body("flavor").optional().isString(),
        body("benefits").optional().isString(),
        body("usage").optional().isString(),
    ],
], productController.createProduct);

router.get('/products/:id', productController.getProductById);

router.put('/products/:id', [
    authorize(["admin"]),
    fileUploadMiddleware.upload.single('image'),
    [
        body("name").isString().notEmpty(),
        body("description").isString().notEmpty(),
        body("price").isNumeric().notEmpty().toFloat(),
        body("priceBarre").isNumeric().notEmpty().toFloat(),
        body("category_id").isInt().notEmpty().toInt(),
        body("brand_id").isInt().notEmpty().toInt(),
        body("product_type_id").isInt().notEmpty().toInt(),
        body("weight").isInt().notEmpty().toInt(),
        body("rating").default(1).isInt({min: 1, max: 5}).toInt(),
        body("reviews").optional().isString(),
        body("origin").optional().isString(),
        body("texture").optional().isString(),
        body("flavor").optional().isString(),
        body("benefits").optional().isString(),
        body("usage").optional().isString(),
    ],
],productController.updateProduct);

router.delete('/products/:id',
    authorize(["admin"]),
productController.deleteProduct);

module.exports = router;
