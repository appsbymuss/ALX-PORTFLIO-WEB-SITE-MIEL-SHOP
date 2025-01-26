const express = require('express');
const router = express.Router();
const brandController = require('../../controller/business-logic/brand.controller');
const { body, param } = require('express-validator');
const { authorize } = require('../../middleware/authorization');

router.get('/brands', brandController.getBrands);

router.post('/brands',
    authorize(["admin"]),
    [
        body('name').isString(),
        body('description').optional().isString()
    ],
brandController.createBrand);

router.get('/brands/:id', [
    param("id").isInt()
], brandController.getBrandById);

router.put('/brands/:id',
    authorize(["admin"]),
    [
        param("id").isInt(),
        body('name').isString(),
        body('description').optional().isString()
    ],
brandController.updateBrand);

router.delete('/brands/:id',
    authorize(["admin"]),
    [
        param("id").isInt(),
    ],
brandController.deleteBrand);

module.exports = router;