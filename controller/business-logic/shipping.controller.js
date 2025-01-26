const MondialRelay = require("../../dist/utils/shipping/services/mondial-relay-class/mondialRelay"); // Converted from Javascript-Class to (tsc built-)Typescript-class
const validationResult = require('express-validator').validationResult;

async function getShippingCostsMR(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: errors.array() });
    }
    const result = MondialRelay.getQuote(req);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({error:'Internal Server Error'});
  }
}

async function getPointsRelaysNearbyMR(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: errors.array() });
    }
    const result = await MondialRelay.searchPointRelay(req.body.pays, req.body.ville, req.body.CP);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({error:'Internal Server Error'});
  }
}

module.exports = {
    getShippingCostsMR,
    getPointsRelaysNearbyMR
}