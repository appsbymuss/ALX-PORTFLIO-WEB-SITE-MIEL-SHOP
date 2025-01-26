const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createOrderItem(data) {
  let orderItem;
  try {
    orderItem = await prisma.order_item.create({ data });
  } finally {
    await prisma.$disconnect();
  }
  return orderItem;
}

async function getOrderItemById(orderId, productId) {
  let orderItem;
  try {
    orderItem = await prisma.order_item.findUnique({
      where: { id_order: orderId, id_product: productId },
    });
  } finally {
    await prisma.$disconnect();
  }
  return orderItem;
}

async function updateOrderItem(orderId, productId, data) {
  let updatedOrderItem;
  try {
    updatedOrderItem = await prisma.order_item.update({
      where: { id_order: orderId, id_product: productId },
      data,
    });
  } finally {
    await prisma.$disconnect();
  }
  return updatedOrderItem;
}

async function deleteOrderItem(orderId, productId) {
  let deletedOrderItem;
  try {
    deletedOrderItem = await prisma.order_item.delete({
      where: { id_order: orderId, id_product: productId },
    });
  } finally {
    await prisma.$disconnect();
  }
  return deletedOrderItem;
}

module.exports = {
  createOrderItem,
  getOrderItemById,
  updateOrderItem,
  deleteOrderItem,
};
