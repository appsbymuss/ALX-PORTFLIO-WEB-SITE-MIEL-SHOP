const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getStocks(filter, pagination) {
  let stocks;
  try {
    stocks = await prisma.stock.findMany({
      ...pagination,
    });
  } finally {
    await prisma.$disconnect();
  }
  return stocks;
}

async function createStock(data) {
  let stock;
  try {
    stock = await prisma.stock.create({ data });
  } finally {
    await prisma.$disconnect();
  }
  return stock;
}

async function getStockById(id) {
  let stock;
  try {
    stock = await prisma.stock.findUnique({ where: { id } });
  } finally {
    await prisma.$disconnect();
  }
  return stock;
}

async function updateStock(id, data) {
  let updatedStock;
  try {
    updatedStock = await prisma.stock.update({ where: { id }, data });
  } finally {
    await prisma.$disconnect();
  }
  return updatedStock;
}

async function deleteStock(id) {
  let deletedStock;
  try {
    deletedStock = await prisma.stock.delete({ where: { id } });
  } finally {
    await prisma.$disconnect();
  }
  return deletedStock;
}

module.exports = {
  getStocks,
  createStock,
  getStockById,
  updateStock,
  deleteStock,
};
