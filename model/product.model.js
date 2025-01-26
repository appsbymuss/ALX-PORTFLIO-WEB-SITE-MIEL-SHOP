const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getProductTVAById(id) {
  let percentage;
  try {
    percentage = await prisma.product.findUnique({
      where: { id },
      include: {
        product_type: {
            select: {
              tva_percentage: true
            }
        }
      }
    });
  } finally {
    await prisma.$disconnect();
  }
  return percentage.product_type.tva_percentage;
}

async function getProductsCount(filter) {
  try {
    return await prisma.product.count({ where: filter });
  } catch (err) {
    return 0;
  }
}

async function getProductsMinimalInfo(filter, pagination) {
  let products = [];
  try {
    products = await prisma.product.findMany({
      where: filter,
      select: {
        "id": true,
        "name": true
      },
      ...pagination,
    });
  } finally {
    await prisma.$disconnect();
  }
  return products;
}

async function getProducts(filter, pagination) {
  let products = [];
  try {
    products = await prisma.product.findMany({
      where: filter,
      include: {
        brand: {
          select: {
            "name": true
          }
        },
        // category: true,
        category: {
          select: {
            "name": true
          }
        }
      },
      ...pagination,
    });
  } finally {
    await prisma.$disconnect();
  }
  return products;
}

async function createProduct(data) {
  let product;
  try {
    product = await prisma.product.create({ data });
  } finally {
    await prisma.$disconnect();
  }
  return product;
}

async function getProductById(id) {
  let product;
  try {
    product = await prisma.product.findUnique({ where: { id } });
  } finally {
    await prisma.$disconnect();
  }
  return product;
}

async function updateProduct(id, data) {
  let updatedProduct;
  try {
    updatedProduct = await prisma.product.update({ where: { id }, data });
  } finally {
    await prisma.$disconnect();
  }
  return updatedProduct;
}

async function deleteProduct(id) {
  let deletedProduct;
  try {
    deletedProduct = await prisma.product.delete({ where: { id } });
  } finally {
    await prisma.$disconnect();
  }
  return deletedProduct;
}

module.exports = {
  getProducts,
  getProductsMinimalInfo,
  getProductsCount,
  createProduct,
  getProductById,
  getProductTVAById,
  updateProduct,
  deleteProduct,
};
