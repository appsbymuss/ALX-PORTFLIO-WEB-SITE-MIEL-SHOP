const express = require('express');
const router = express.Router();
const userController = require('../../controller/business-logic/user.controller');
const { body } = require('express-validator');
const { authorize } = require('../../middleware/authorization');

router.post('/users', authorize(["admin"]), 
    [
        body('fullName').isString(),
        body('numberPhone').isString(),
        body('password').isString()
    ],
userController.createUser);

router.get('/users/:id', authorize(["admin"]), userController.getUserById);

router.get('/profile', authorize(["user"]), userController.getProfile);

router.put('/users/:id', authorize(["admin"]), userController.updateUser);
router.delete('/users/:id', authorize(["admin"]), userController.deleteUser);

// TODO: Add /profile
// GET: Get all profile data
// PUT: Update

module.exports = router;
