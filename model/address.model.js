const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
// const db = require('./database/db');

async function getAddressesByUserID(id) {
  let addresses;
  try {
    addresses = await prisma.address.findMany({
        where: {
          provided_by_user_id: id
        }
    });
  } finally {
    await prisma.$disconnect();
  }
  console.log(addresses);
  return addresses;
}

async function createAddress(data) {
  let address;
  try {
    address = await prisma.address.create({ data });
  } finally {
    await prisma.$disconnect();
  }
  return address;
}

async function getAddressById(id) {
  let address;
  try {
    address = await prisma.address.findUnique({ where: { id } });
  } finally {
    await prisma.$disconnect();
  }
  return address;
}

async function updateAddress(id, data) {
  let updatedAddress;
  try {
    updatedAddress = await prisma.address.update({ where: { id }, data });
  } finally {
    await prisma.$disconnect();
  }
  return updatedAddress;
}

async function deleteAddress(id) {
  let deletedAddress;
  try {
    deletedAddress = await prisma.address.delete({ where: { id } });
  } finally {
    await prisma.$disconnect();
  }
  return deletedAddress;
}

module.exports = {
  getAddressesByUserID,
  createAddress,
  getAddressById,
  updateAddress,
  deleteAddress,
};
