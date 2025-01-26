const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getProductTypes() {
  let productTypes;
  try {
    productTypes = await prisma.product_type.findMany({});
  } finally {
    await prisma.$disconnect();
  }
  return productTypes;
}

async function createProductType(data) {
  let productType;
  try {
    productType = await prisma.product_type.create({ data });
  } finally {
    await prisma.$disconnect();
  }
  return productType;
}

async function getProductTypeById(id) {
  let productType;
  try {
    productType = await prisma.product_type.findUnique({ where: { id } });
  } finally {
    await prisma.$disconnect();
  }
  return productType;
}

async function updateProductType(id, data) {
  let updatedProductTypes;
  try {
    updatedProductTypes = await prisma.product_type.update({ where: { id }, data });
  } finally {
    await prisma.$disconnect();
  }
  return updatedProductTypes;
}

async function deleteProductType(id) {
  let deletedProductType;
  try {
    deletedProductType = await prisma.product_type.delete({ where: { id } });
  } finally {
    await prisma.$disconnect();
  }
  return deletedProductType;
}

module.exports = {
  getProductTypes,
  createProductType,
  getProductTypeById,
  updateProductType,
  deleteProductType,
};
