const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getOrders(filter, pagination) {
  let orders;
  try {
    orders = await prisma.order.findMany({
      orderBy: {
				createdAt: "desc"
			},
      where: filter,
      include: { 
        order_item: {
          include: {
            product: true,
          }
        },
        payment: true,
        user: true,
        address: true,
        applied_coupon: {
          include: {
            coupon: true            
          }
        }
      },
      ...pagination,
    });
  } finally {
    await prisma.$disconnect();
  }
  return orders;
}

async function getOrdersCount(filter) {
  try {
    return await prisma.order.count({ where: filter });
  } catch (err) {
    return 0;
  }
}

async function createOrder(data) {
  let order;
  try {
    await prisma.$transaction(async (tx) => {
      order = await tx.order.create({ 
        data: {
          id_user: data.id_user,
          id_address: data.id_address
        }
      });

      for (const order_item of data.order_items) {
        await tx.order_item.create({
          data: {
            quantity: order_item.quantity,
            id_product: order_item.id_product,
            id_order: order.id,
          },
        });
      }

    });
  } finally {
    await prisma.$disconnect();
  }
  return order;
}

async function getOrderById(id) {
  let order;
  try {
    order = await prisma.order.findUnique({
      where: { id },
      include: { 
        order_item: {
          include: {
            product: true,
          }
        },
        payment: true,
        user: true,
        address: true,
        applied_coupon: {
          include: {
            coupon: true            
          }
        }
      }
    });
  } finally {
    await prisma.$disconnect();
  }
  return order;
}

async function updateOrder(id, data) {
  let updatedOrder;
  try {
    updatedOrder = await prisma.order.update({ where: { id }, data });
  } finally {
    await prisma.$disconnect();
  }
  return updatedOrder;
}

async function deleteOrder(id) {
  let deletedOrder;
  try {
    deletedOrder = await prisma.order.delete({ where: { id } });
  } finally {
    await prisma.$disconnect();
  }
  return deletedOrder;
}

module.exports = {
  getOrders,
  getOrdersCount,
  createOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
};
