const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkForItemShortage(product_id, stock_id) {
  let isShort = false;
  try {
    const result = await prisma.stock_product.findFirst({
      where: {
        product_id: product_id,
        stock_id: stock_id
      },
      select: {
        quantity: true
      }
    });
    return_status = (result.quantity <= 50) ? true : false;
  } finally {
    await prisma.$disconnect();
  }

  return { isShort };
}

async function getStockProducts(filter, pagination) {
  let stockProducts;
  try {
    stockProducts = await prisma.stock_product.findMany({
      where: filter,
      ...pagination,
    });
  } finally {
    await prisma.$disconnect();
  }
  return stockProducts;
}

async function createStockProduct(data) {
  let stockProduct;
  try {
    stockProduct = await prisma.stock_product.create({ data });
  } finally {
    await prisma.$disconnect();
  }
  return stockProduct;
}

async function getStockProductById(id) {
  let stockProduct;
  try {
    stockProduct = await prisma.stock_product.findUnique({ where: { id } });
  } finally {
    await prisma.$disconnect();
  }
  return stockProduct;
}

async function updateStockProduct(id, data) {
  let updatedStockProduct;
  try {
    updatedStockProduct = await prisma.stock_product.update({ where: { id }, data });
  } finally {
    await prisma.$disconnect();
  }
  return updatedStockProduct;
}

async function deleteStockProduct(id) {
  let deletedStockProduct;
  try {
    deletedStockProduct = await prisma.stock_product.delete({ where: { id } });
  } finally {
    await prisma.$disconnect();
  }
  return deletedStockProduct;
}

module.exports = {
  checkForItemShortage,
  getStockProducts,
  createStockProduct,
  getStockProductById,
  updateStockProduct,
  deleteStockProduct,
};
