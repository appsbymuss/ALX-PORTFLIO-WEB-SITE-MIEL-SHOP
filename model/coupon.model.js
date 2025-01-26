const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function applyCoupon(id_coupon, id_order) {
  let applyCoupon;
  try {
    applyCoupon = await prisma.applied_coupon.create({
      data: {
        id_coupon: id_coupon,
        id_order: id_order
      } 
    });
  } finally {
    await prisma.$disconnect();
  }
  return applyCoupon;
}

async function createCoupon(data) {
  let coupon;
  try {
    coupon = await prisma.coupon.create({ data });
  } finally {
    await prisma.$disconnect();
  }
  return coupon;
}

async function getCouponsCount(filter) {
  try {
  return await prisma.coupon.count({ where: filter });
  } catch (err) {
  return 0;
  }
}

async function getCouponsCount(filter) {
  try {
  return await prisma.coupon.count({ where: filter });
  } catch (err) {
  return 0;
  }
}

async function getCoupons(filter, pagination) {
  let coupons = [];
  try {
    coupons = await prisma.coupon.findMany({
      where: filter,
      orderBy: {
        created_at: "desc"
      },
      include: {
        product: {
          select: {
            "name": true
          }
        }
      },
      ...pagination
    });
  } finally {
    await prisma.$disconnect();
  }
  return coupons;
}

async function getCouponById(id) {
  let coupon;
  try {
    coupon = await prisma.coupon.findUnique({ where: { id } });
  } finally {
    await prisma.$disconnect();
  }
  return coupon;
}

async function isCouponValid(couponCode) {
  let coupon;
  try {
    coupon = await prisma.coupon.findUnique({
      where: {
        couponCode: couponCode,
        date_start: {
          lte: new Date(),
        },
        date_end: {
          gt: new Date()
        }
      }
    })
  } finally {
    await prisma.$disconnect();
  }
  return coupon;
}

async function updateCoupon(id, data) {
  let updatedCoupon;
  try {
    updatedCoupon = await prisma.coupon.update({ where: { id }, data });
  } finally {
    await prisma.$disconnect();
  }
  return updatedCoupon;
}

async function deleteCoupon(id) {
  let deletedCoupon;
  try {
    deletedCoupon = await prisma.coupon.delete({ where: { id } });
  } finally {
    await prisma.$disconnect();
  }
  return deletedCoupon;
}

module.exports = {
  createCoupon,
  getCoupons,
  getCouponsCount,
  getCouponById,
  isCouponValid,
  applyCoupon,
  updateCoupon,
  deleteCoupon,
};
