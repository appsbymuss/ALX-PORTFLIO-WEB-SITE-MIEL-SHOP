// Environment Variables [SETTING UP]
require('dotenv').config({ path: (process.env.ENV_TYPE == 'development') ? "./.env.development" : "./.env.production"});

// Express Files
const express = require('express');
const app = express();

// API Endpoint Groups
const apiRouter = require('./routes/api.routes');
const authRouter = require('./routes/auth.routes');

// Payment Handler Controllers
const { handleSuccessCheckoutWH } = require('./controller/business-logic/payment.controller');

// Logger
const logger = require('./utils/logging/morgan');

// InFile Logger // BUG: Get rid of this, useless logging code
const { fileLoggerMiddleware } = require('./utils/logging/winston');

// CORS (Cross-Origin Resource Sharing)
const cors = require('cors');

// Expression Session
const session = require('express-session');

// Cookie Parser
const cookieParser = require('cookie-parser');

// PassportJS
const passport = require('passport');
/**
 * [SOCKET.IO SETUP]
 * // HTTP Server
const { createServer } = require("http");
 * // HTTP Server Creation
const httpServer = createServer(app);
 * // Socket.IO Initiatializator
const socketIo = require('./utils/notifications/ws').initiate(httpServer);
*/

// *- Applying Middlewares -*
app.use(cors({
    // TODO: Be careful about the origin set here because it will affect how CORS responds to such thing
    origin: [
        process.env.HOST,
        "http://localhost:5173",
        "http://localhost:5174",
        "https://www.lemiel.shop",
        "https://admin.lemiel.shop"
    ],
    credentials: true
}));

// *- Payment Webhook -*
app.post('/api/checkout/webhook', 
    express.raw({type: 'application/json'}), 
    handleSuccessCheckoutWH);
    
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 24 * 60 * 60 * 1000
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(fileLoggerMiddleware());
app.use(logger("FORMAT_MAIN"));

// *- Applying API Endpoints -*
app.use('/api', apiRouter);
app.use('/auth', authRouter);

// *- Listen for incoming traffic -*
app.listen(process.env.PORT, (req, res) => {
    console.log("[Running on Mode]: ", (process.env.ENV_TYPE == 'development') ? "DEV" : "PROD");
    console.log(`Listening on [${process.env.HOST}] (Port <> ${process.env.PORT})`);
})