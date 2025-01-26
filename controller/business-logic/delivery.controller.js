const deliveryModel = require('../../model/delivery.model');
const { validationResult } = require('express-validator');
const paginate = require('../../utils/misc/pagination');

// TODO: Create GetDeliveries by Filters
async function getDeliveries(req, res) {
  let deliveries = {};
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: errors.array() });
    }
    const { page = 1, max_items = 10 } = req.query;
    
    let filter = {};
    
    const pagination = {
      skip: (parseInt(page) - 1) * parseInt(max_items),
      take: parseInt(max_items)
    };
    
    const totalCount = await deliveryModel.getDeliveriesCount(filter);
    
    deliveries.paginate = paginate(totalCount, parseInt(page), parseInt(max_items));

    deliveries.data = await deliveryModel.getAllDeliveries(filter, pagination);

    return res.json(deliveries);
  } catch (error) {
    console.error(error);
    res.status(500).json({error:'Internal Server Error'});
  }
}

module.exports = {
    getDeliveries
}