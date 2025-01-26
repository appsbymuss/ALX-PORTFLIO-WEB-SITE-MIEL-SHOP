const inFileLogger = require('express-winston');
const { transports, format, createLogger } = require('winston');
const chalk = require('chalk');
const { centerPadIp, classifyAction, classifySessionIdByRole, classifyOperation } = require('./misc');

const logs_path = 'utils/logging/logs'

const fileLoggerMiddleware = () => {
    return inFileLogger.logger({
        transports: [
            new transports.File({
                level: 'info',
                filename: `${logs_path}/logsInformations.log`,
                maxsize: 10485760, // 10MB in bytes, adjust as needed
                maxFiles: 5, // Retain 5 files before rotation
                tailable: true // Enable tailing
            }),
            new transports.File({
                level: 'warn',
                filename: `${logs_path}/logsWarnings.log`,
                maxsize: 10485760, // 10MB in bytes, adjust as needed
                maxFiles: 5,
                tailable: true
            }),
            new transports.File({
                level: 'error',
                filename:  `${logs_path}/logsErrors.log`,
                maxsize: 10485760, // 10MB in bytes, adjust as needed
                maxFiles: 5,
                tailable: true
            }),
        ],
        dynamicMeta: (req, res) => {
            const httpRequest = {}
            const meta = {}
            if (req) {
                meta.httpRequest = httpRequest
                httpRequest.requestMethod = req.method
                httpRequest.requestUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`
                httpRequest.protocol = `HTTP/${req.httpVersion}`
                // httpRequest.remoteIp = req.ip // this includes both ipv6 and ipv4 addresses separated by ':'
                httpRequest.remoteIp = req.ip.indexOf(':') >= 0 ? req.ip.substring(req.ip.lastIndexOf(':') + 1) : req.ip   // just ipv4
                httpRequest.requestSize = req.socket.bytesRead
                httpRequest.userAgent = req.get('User-Agent')
                httpRequest.referrer = req.get('Referrer')
                httpRequest.userRole = (!req.user) ? null : req.user.role;
                httpRequest.userSessionId = req.cookies['connect.sid']
            }
            return meta
        },
        format: format.combine(
            format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            format.errors({ stack: true }),
            // format.colorize({all: true}),
            format.splat(),
            format.printf(info => {
                let levelColor, methodColor;

                const MD5_Function = require("crypto-js/md5");
                const HexStrategy = require('crypto-js').enc.Hex;
                info.meta.httpRequest.userSessionId = MD5_Function(info.meta.httpRequest.userSessionId).toString(HexStrategy).substring(0, 8) + "...";

                // const MD5_Function = require("crypto-js/md5");
                // const HexStrategy = require('crypto-js').enc.Hex;
                // info.meta.httpRequest.session.id = MD5_Function(session.id).toString(HexStrategy);

                switch (info.level.toUpperCase()) {
                    case 'INFO':
                        levelColor = chalk.green.bold;
                        break;
                    case 'WARN':
                        levelColor = chalk.yellow.bold;
                        break;
                    case 'ERROR':
                        info.level = 'ERRO';
                        levelColor = chalk.red.bold;
                        break;
                    default:
                        levelColor = chalk.white.bold;
                }

                switch (info.meta.httpRequest.requestMethod) {
                    case 'GET':
                        methodColor = chalk.green.bold;
                        break;
                    case 'POST':
                        methodColor = chalk.blue.bold;
                        break;
                    case 'PUT' || 'PATCH':
                        methodColor = chalk.cyan.bold;
                        break;
                    case 'DELETE':
                        methodColor = chalk.red.bold;
                        break;

                    default:
                        methodColor = chalk.grey.bold
                }

                return `[${levelColor(info.level.toUpperCase())}]` + 
                `[${chalk.grey(info.timestamp)}]` + 
                `[${classifySessionIdByRole(info.meta.httpRequest.userSessionId, info.meta.httpRequest.userRole)}]` +
                `[${chalk.greenBright(centerPadIp(info.meta.httpRequest.remoteIp))}]` + 
                `[${chalk.yellow.bold(info.meta.httpRequest.protocol + ' ' + info.meta.httpRequest.requestMethod)}[${methodColor('*')}]) ${chalk.blueBright(info.meta.req.url)}] ` +
                `[=> ${chalk.red(info.meta.res.statusCode)}] ` +
                ` [${chalk.magentaBright(info.meta.responseTime)} ms]`;
            })
        ),
        statusLevels: true
    })
};

const fileLogger = createLogger({
    transports: [
        new transports.File({
            level: "info",
            filename: `${logs_path}/logsActions.log`,
            maxsize: 10485760, // 10MB in bytes, adjust as needed
            tailable: true
        }),
    ],
    format: format.combine(
        // format.json(),
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.errors({ stack: true }), // Include stack traces for errors
        // format.colorize({all: true}),
        format.splat(),
        format.printf(({ level, message, timestamp, session }) => {
            let levelColor;

            switch (level.toUpperCase()) {
                case 'INFO':
                    levelColor = chalk.green.bold;
                    break;
                case 'ERROR':
                    info.level = 'ERRO';
                    levelColor = chalk.red.bold;
                    break;
                case 'WARN':
                    levelColor = chalk.hex('#FFA500').bold;
                    break;
            }
            let logLine = `[${levelColor(level.toUpperCase())}]` + 
                `[${chalk.grey(timestamp)}]` +
                `[${classifyAction(message.action)}]` + 
                `[${classifySessionIdByRole(session.id, session.role)}]` +
                classifyOperation(message.operation, message) +
                `[${message.text}]`;

            return logLine;
        })
    ),
    statusLevels: true
});

const logWithSession = (session, level, message) => {
    const MD5_Function = require("crypto-js/md5");
    const HexStrategy = require('crypto-js').enc.Hex;
    session.id = MD5_Function(session.id).toString(HexStrategy).substring(0, 8) + "...";
    fileLogger.log({
        level: level,
        message: message,
        timestamp: new Date().toISOString(),
        session: session
    });
};

const logInfo = (session, message) => logWithSession(session, 'info', message);
const logFailure = (session, message) => logWithSession(session, 'error', message);
const logWarn = (session, message) => logWithSession(session, 'warn', message);

/**
 * [CONTENTS OF 'message']:
 * action: string,
 * text: string
 */

module.exports = {
    fileLoggerMiddleware,
    // Log Functions
    logInfo,
    logFailure,
    logWarn
};
