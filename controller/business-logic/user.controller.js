const userModel = require('../../model/user.model');
const { validationResult } = require('express-validator');

async function createUser(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: errors.array() });
    }
    const user = await userModel.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({error:'Internal Server Error'});
  }
}

async function getUserById(req, res) {
  const userId = parseInt(req.params.id, 10);
  try {
    const user = await userModel.getUserById(userId);
    if (!user) {
      return res.status(404).json({error:'User not found'});
    } else {
      res.json(user);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({error:'Internal Server Error'});
  }
}

async function getProfile(req, res) {
  const userId = req.user.user_id;
  try {
    const user = await userModel.getProfile(userId);
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({error: 'Internal Server Error' + error});
  }
}

async function updateProfile(req, res) {
  const userId = req.user.user_id;
  let profileInfo = {
    numberPhone: req.body.numberPhone,
    password: req.body.password,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    gender: req.body.gender,
  };
  try {
    const updatedUser = await userModel.updateProfile(userId, profileInfo)
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({error: 'Internal Server Error' + error});
  }
}

async function updateUser(req, res) {
  const userId = parseInt(req.params.id, 10);
  try {
    const updatedUser = await userModel.updateUser(userId, req.body);
    if (!updatedUser) {
      res.status(404).json({error:'User not found'});
    } else {
      res.json(updatedUser);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({error:'Internal Server Error'});
  }
}

async function deleteUser(req, res) {
  const userId = parseInt(req.params.id, 10);
  try {
    const deletedUser = await userModel.deleteUser(userId);
    if (!deletedUser) {
      res.status(404).json({error:'User not found'});
    } else {
      res.json(deletedUser);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({error:'Internal Server Error'});
  }
}

module.exports = {
  createUser,
  getUserById,
  getProfile,
  updateProfile,
  updateUser,
  deleteUser,
};