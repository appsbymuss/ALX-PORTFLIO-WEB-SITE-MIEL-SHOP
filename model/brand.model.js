const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
// const db = require('./database/db');

async function getBrands(filter, pagination) {
  // let brands = {};
  let brands;
  try {
    brands = await prisma.brand.findMany({
      where: filter,
      ...pagination,
    });
    // TODO: Think of Pagination Strategy
    // brands.total_count = await prisma.brand.count();
  } finally {
    await prisma.$disconnect();
  }
  return brands;
}

async function createBrand(data) {
  let brand;
  try {
    brand = await prisma.brand.create({ data });
  } finally {
    await prisma.$disconnect();
  }
  return brand;
}

async function getBrandById(id) {
  let brand;
  try {
    brand = await prisma.brand.findUnique({ where: { id } });
  } finally {
    await prisma.$disconnect();
  }
  return brand;
}

async function updateBrand(id, data) {
  let updatedBrand;
  try {
    updatedBrand = await prisma.brand.update({ where: { id }, data });
  } finally {
    await prisma.$disconnect();
  }
  return updatedBrand;
}

async function deleteBrand(id) {
  let deletedBrand;
  try {
    deletedBrand = await prisma.brand.delete({ where: { id } });
  } finally {
    await prisma.$disconnect();
  }
  return deletedBrand;
}

module.exports = {
  getBrands,
  createBrand,
  getBrandById,
  updateBrand,
  deleteBrand,
};
