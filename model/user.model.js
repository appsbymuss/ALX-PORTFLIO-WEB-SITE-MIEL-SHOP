const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


async function createUser(data) {
  let user;
  try {
    user = await prisma.user.create({ data });
  } finally {
    await prisma.$disconnect();
  }
  return user;
}

async function findOrCreateUser(data) {
  let user;

  try {
    user = await prisma.user.findUniqueOrThrow({
      where: {
        oauthId: data.oauthId,
      }
    });
  } catch (err) {
    user = await prisma.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
        oauthId: data.oauthId,
        oauthProvider: data.providerName,
        email: data.email
      }
    })
  } finally {
    await prisma.$disconnect();
  }
  return user;
}

async function getUserById(id) {
  let user;
  try {
    user = await prisma.user.findUnique({ where: { id } });
  } finally {
    await prisma.$disconnect();
  }
  return user;
}

async function getProfile(id) {
  let profile = {};
  try {
    profile.user = await prisma.user.findUnique({
      where: {
        id: id
      }
    })

    profile.mostBoughtItems = await prisma.$queryRaw`SELECT prd.* FROM product prd INNER JOIN order_item ord_it ON prd.id = ord_it.id_product INNER JOIN \`order\` o ON o.id = ord_it.id_order WHERE o.id_user = ${id} GROUP BY prd.id ORDER BY SUM(ord_it.quantity) DESC LIMIT 5;`
  } finally {
    await prisma.$disconnect();
  }
  return profile;
}

async function updateProfile(id, data) {
  let profile = {};
  try {
    profile = await prisma.user.update({
      where: {
        id: id
      },
      data: data
    })
  } finally {
    await prisma.$disconnect();
  }
  return profile;
}

async function getUserByEmail(email) {
  let user;
  try {
    user = await prisma.user.findUnique({ where: {
      email: email
    }})
  } finally {
    await prisma.$disconnect();
  }
  return user;
}

// TODO: Try to find a better way to get a specific user
// - Work on the Controller handling it aswell
// @verifyAccount in /controller/auth/signing-up.js
async function getUnverifiedUserByToken(verification_token) {
  let user;
  try {
    user = await prisma.user.findFirst({ where: {
      verify_token: verification_token,
      verified_at: null
    }})
  } finally {
    await prisma.$disconnect();
  }
  return user;
}

async function updateUser(id, data) {
  let updatedUser;
  try {
    updatedUser = await prisma.user.update({ where: { id }, data });
  } finally {
    await prisma.$disconnect();
  }
  return updatedUser;
}

async function deleteUser(id) {
  let deletedUser;
  try {
    deletedUser = await prisma.user.delete({ where: { id } });
  } finally {
    await prisma.$disconnect();
  }
  return deletedUser;
}

module.exports = {
  createUser,
  findOrCreateUser,
  getUserById,
  getProfile,
  updateProfile,
  getUserByEmail,
  getUnverifiedUserByToken,
  updateUser,
  deleteUser,
};
