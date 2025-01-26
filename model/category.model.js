const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getCategoriesCount(filter) {
  try {
  return await prisma.category.count({ where: filter });
  } catch (err) {
  return 0;
  }
}

async function getCategories(filter, pagination) {
  let categories;
  try {
    categories = await prisma.category.findMany({
      where: filter,
      ...pagination,
    });
  } finally {
    await prisma.$disconnect();
  }
  return categories;
}

async function createCategory(data) {
  let category;
  try {
    category = await prisma.category.create({ data });
  } finally {
    await prisma.$disconnect();
  }
  return category;
}

async function getCategoryById(id) {
  let category;
  try {
    category = await prisma.category.findUnique({ where: { id } });
  } finally {
    await prisma.$disconnect();
  }
  return category;
}

async function updateCategory(id, data) {
  let updatedCategory;
  try {
    updatedCategory = await prisma.category.update({ where: { id }, data });
  } finally {
    await prisma.$disconnect();
  }
  return updatedCategory;
}

async function deleteCategory(id) {
  let deletedCategory;
  try {
    deletedCategory = await prisma.category.delete({ where: { id } });
  } finally {
    await prisma.$disconnect();
  }
  return deletedCategory;
}

module.exports = {
  getCategories,
  getCategoriesCount,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
