const { validationResult } = require('express-validator');
const addressModel = require('../../model/address.model');

// TODO: Apply (auth) middleware to check same user
async function getAddresses(req, res) {
  let addresses = []
  try {
    addresses = await addressModel.getAddressesByUserID(req.user.user_id);
    return res.status(200).json(addresses);
  } catch (error) {
    console.error(error);
    return res.status(500).json({"error": "Internal Server Error"});
  }
}

async function createAddress(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: errors.array() });
    }
    let parsedBody = req.body;
    parsedBody.provided_by_user_id = req.user.user_id;
    const address = await addressModel.createAddress(parsedBody);
    return res.status(201).json(address);
  } catch (error) {
    console.error(error);
    return res.status(500).json({error:'Internal Server Error'});
  }
}

async function getAddressById(req, res) {
  const addressId = parseInt(req.params.id, 10);
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: errors.array() });
    }
    const address = await addressModel.getAddressById(addressId);
    if (!address || req.user.user_id != address.provided_by_user_id) {
      return res.status(404).json({error:'Address not found'});
    } else {
      return res.json(address);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({error:'Internal Server Error'});
  }
}

async function updateAddress(req, res) {
  const addressId = parseInt(req.params.id, 10);
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: errors.array() });
    }

    const address = await addressModel.getAddressById(addressId);
    if (!address || req.user.user_id != address.provided_by_user_id)
      return res.status(404).json({error:'Address not found'});

    let parsedBody = req.body;
    parsedBody.provided_by_user_id = req.user.user_id;

    const updatedAddress = await addressModel.updateAddress(addressId, parsedBody);
    if (!updatedAddress) {
      return res.status(404).json({error:'Address not found'});
    } else {
      return res.json(updatedAddress);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({error:'Internal Server Error'});
  }
}

async function deleteAddress(req, res) {
  const addressId = parseInt(req.params.id, 10);
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: errors.array() });
    }

    const address = await addressModel.getAddressById(addressId);
    if (!address || req.user.user_id != address.provided_by_user_id)
      return res.status(404).json({error:'Address not found'});

    if (!address) {
      return res.status(404).json({error:'Address not found'});
    } else {
      const deletedAddress = await addressModel.deleteAddress(addressId);
      return res.json(deletedAddress);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({error:'Internal Server Error'});
  }
}

module.exports = {
  getAddresses,
  createAddress,
  getAddressById,
  updateAddress,
  deleteAddress,
};
