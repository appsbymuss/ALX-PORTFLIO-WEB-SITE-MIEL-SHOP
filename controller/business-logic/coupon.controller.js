const couponModel = require('../../model/coupon.model');
const { validationResult } = require('express-validator');
const paginate = require('../../utils/misc/pagination');

async function getCoupons(req, res) {
  let coupons = {};
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
    
    const totalCount = await couponModel.getCouponsCount(filter);
    
    coupons.paginate = paginate(totalCount, parseInt(page), parseInt(max_items));

    coupons.data = await couponModel.getCoupons(filter, pagination);

    return res.json(coupons);
  } catch (error) {
    console.error(error);
    res.status(500).json({error:'Internal Server Error'});
  }
}

async function createCoupon(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: errors.array() });
    }
    const coupon = await couponModel.createCoupon(req.body);
    res.status(201).json(coupon);
  } catch (error) {
    console.error(error);
    res.status(500).json({error:'Internal Server Error'});
  }
}

// TODO: Add Strict Rate-Limiting on this Route
async function checkCoupon(req, res) {
  const couponCode = req.body.couponCode;
  try {
    const coupon = await couponModel.isCouponValid(couponCode);
    if (!coupon) {
      return res.status(404).json({error: 'Coupon not found'});
    } else {
      return res.json({
        "valid": true,
        "type": coupon.type, // product/order
        "discountPercentage": coupon.percentage
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: 'Internal Server Error: ', error})
  }
}

async function getCouponById(req, res) {
  const couponId = parseInt(req.params.id, 10);
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: errors.array() });
    }
    const coupon = await couponModel.getCouponById(couponId);
    if (!coupon) {
      return res.status(404).json({error:'Coupon not found'});
    } else {
      return res.json(coupon);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({error:'Internal Server Error'});
  }
}

async function updateCoupon(req, res) {
  const couponId = parseInt(req.params.id, 10);
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: errors.array() });
    }
    const updatedCoupon = await couponModel.updateCoupon(couponId, req.body);
    if (!updatedCoupon) {
      return res.status(404).json({error:'Coupon not found'});
    } else {
      return res.json(updatedCoupon);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({error:'Internal Server Error'});
  }
}

async function deleteCoupon(req, res) {
  const couponId = parseInt(req.params.id, 10);
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: errors.array() });
    }
    const deletedCoupon = await couponModel.deleteCoupon(couponId);
    if (!deletedCoupon) {
      res.status(404).json({error:'Coupon not found'});
    } else {
      res.json(deletedCoupon);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({error:'Internal Server Error'});
  }
}

module.exports = {
  createCoupon,
  getCoupons,
  getCouponById,
  updateCoupon,
  deleteCoupon,
  checkCoupon
};
