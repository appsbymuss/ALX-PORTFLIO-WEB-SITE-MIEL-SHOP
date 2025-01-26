const { PrismaClient } = require('@prisma/client');
const { sendAdminsNotification } = require('../utils/notifications/push');
const prisma = new PrismaClient();

// Stock Product Function to register inventory withdrawal:
const checkItemShortage = require('./stockProduct.model').checkForItemShortage;

// TODO: Check to see if it actually works

prisma.$use(async (params, next) => {
  if (params.model != 'factureitem' || params.action != 'create')
  {
    const result = await next(params);
    return result;
  }

  let iProductID = params.args.product_id;
  let iStockID = params.args.stock_id;

  const result = await next(params);

  console.log("Success facturation");

  asyncCheckQuantityWarning(iProductID, iStockID);
  
  return result
});

async function asyncCheckQuantityWarning(stock_id, product_id) {
  const isShortage = (await checkItemShortage(product_id, stock_id)).isShort;
  if (isShortage)
    sendAdminsNotification(null);
}

async function getFacturesByUserID(userId) {
  let factures;
  try {
    factures = await prisma.facture.findMany({
      where: { user_id: userId },
      include: {
        FactureItem: true,
      },
    });
  } finally {
    await prisma.$disconnect();
  }
  return factures;
}


async function getFactureById(invoiceNumber) {
  let facture;
  try {
    facture = await prisma.facture.findUnique({
      where: { invoiceNumber },
      include: {
        FactureItem: true,
      },
    });
  } finally {
    await prisma.$disconnect();
  }
  return facture;
}


async function createFacture(factureGeneralData, factureItems) {
  try {
    await prisma.$transaction(async (prisma) => {
      const createdFacture = await prisma.facture.create({
        data: factureGeneralData,
      });

      for (const item of factureItems) {
        await prisma.factureitem.create({
          data: {
            ...item,
            facture_id: createdFacture.invoiceNumber,
          },
        });
      }

      return { createdFacture };
    });
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = {
  getFacturesByUserID,
  getFactureById,
  createFacture,
};