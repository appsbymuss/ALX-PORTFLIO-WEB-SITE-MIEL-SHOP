const express = require('express');
const authRouter = express.Router();

const routeAuth = require('./Auth/auth.api');

authRouter.use(routeAuth);

module.exports = authRouter;