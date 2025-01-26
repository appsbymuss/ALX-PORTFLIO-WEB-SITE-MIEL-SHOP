const express = require('express');
const apiRouter = express.Router();

// TODO: Could Add "Versioning" later.

const apiBrand = require('./API/brand.api');
const apiCategory = require('./API/category.api');
const apiCoupon = require('./API/coupon.api');
const apiOrder = require('./API/order.api');
const apiProduct = require('./API/product.api');
const apiUser = require('./API/user.api');
const apiAddress = require('./API/address.api');
const apiDelivery = require('./API/delivery.api');
const apiStock = require('./API/stock.api');
const apiStockProduct = require('./API/stockProduct.api');
const apiProductType = require('./API/productType.api');
const apiPayment = require('./API/payment.api');


apiRouter.use(apiBrand);
apiRouter.use(apiCategory);
apiRouter.use(apiCoupon);
apiRouter.use(apiOrder);
apiRouter.use(apiProduct);
apiRouter.use(apiUser);
apiRouter.use(apiAddress);
apiRouter.use(apiDelivery);
apiRouter.use(apiStock);
apiRouter.use(apiStockProduct);
apiRouter.use(apiProductType);
apiRouter.use(apiPayment);


module.exports = apiRouter;