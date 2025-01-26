const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getDeliveriesCount(filter) {
  try {
  return await prisma.delivery.count({ where: filter });
  } catch (err) {
  return 0;
  }
}

async function getAllDeliveries(filter, pagination) {
  let deliveries;
  try {
    deliveries = await prisma.delivery.findMany({
      orderBy: {
				createdAt: "desc"
			},
      where: filter,
      ...pagination
    });
  } finally {
    await prisma.$disconnect();
  }
  return deliveries;
}

async function getAllDeliveriesByFilter(id = null, expeditionNum = null, orderId = null) {
  let deliveries;
  try {
    deliveries = await prisma.delivery.findMany({
      orderBy: {
				createdAt: "desc"
			},
      where: {
        ...((id) ? {"id": parseInt(id)} : {}),
        ...((expeditionNum) ? {"ExpeditionNum": expeditionNum} : {}),
        ...((orderId) ? {"id_order": parseInt(orderId)} : {}),
      }
    });
  } finally {
    await prisma.$disconnect();
  }
  return deliveries;
}

async function createDelivery(data) {
  let delivery;
  try {
    delivery = await prisma.delivery.create({ data });
  } finally {
    await prisma.$disconnect();
  }
  return delivery;
}

module.exports = {
  getDeliveriesCount,
    getAllDeliveriesByFilter,
    getAllDeliveries,
    createDelivery
}