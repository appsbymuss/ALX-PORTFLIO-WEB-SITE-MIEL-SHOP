const chalk = require('chalk');

/**
 * Pads the IP address to center it within a fixed width.
 * @param {string} ip - The IP address to format.
 * @param {number} width - The fixed width to pad to.
 * @returns {string} - The padded IP address.
 */
function centerPadIp(ip, width = 15) {
    const ipLength = ip.length;
    if (ipLength >= width) {
      return ip; // If IP is longer or equal to the width, return as is
    }
  
    const totalPadding = width - ipLength;
    const paddingLeft = Math.floor(totalPadding / 2);
    const paddingRight = totalPadding - paddingLeft;
  
    return ' '.repeat(paddingLeft) + ip + ' '.repeat(paddingRight);
  }

function classifySessionIdByRole(sessionID, role = null) {
    switch(role) {
        case "admin":
            return chalk.hex('#FFA500').bold(sessionID);
        case "user":
            return chalk.hex('#013220').bold(sessionID);
        case null:
            return chalk.white.bold(sessionID);
        default:
            return chalk.hex('#000080').bold(sessionID);
    }
}

function classifyAction(action) {
    let SUBJECT_TYPE;
    switch (action) {
        case 'Stock':
            SUBJECT_TYPE = chalk.hex('#FFA500')('STCK');
            break;
        case 'Email':
            SUBJECT_TYPE = chalk.hex('#00CED1')('E-ML');
            break;
        case 'Payment':
            SUBJECT_TYPE = chalk.hex('#FFD700')('PYMT');
            break;
        case 'Order':
            SUBJECT_TYPE = chalk.hex('#00FF7F')('ORDR');
            break;
        case 'Delivery':
            SUBJECT_TYPE = chalk.hex('#6495ED')('DLVR');
            break;
        case 'Upload':
            SUBJECT_TYPE = chalk.hex('#FF69B4')('UPLD');
            break;
        case 'Auth':
            SUBJECT_TYPE = chalk.hex('#FF6347')('AUTH');
            break;
        case 'Invoice':
            SUBJECT_TYPE = chalk.hex('#9400D3')('INVC');
            break;
        default:
            SUBJECT_TYPE = chalk.white('OTHR');
            break;
    }

    return SUBJECT_TYPE;
}

function classifyOperation(operationType, message) {
    let OPERATION_TEXT;
    switch (operationType) {
        case "signup":
            OPERATION_TEXT = "";
            break;
        case "signin":
            let txtA;
            switch (message.data && message.data.role){
                case "admin":
                    txtA = chalk.hex('#FFA500').bold("admin");
                    break;
                case "user":
                    txtA = chalk.hex('#013220').bold("user");
                    break;
                default:
                    txtA = chalk.hex('#000080').bold(message.data.role);
                    break;
            }

            OPERATION_TEXT = `[as: ${txtA}]`;
            break;
        case "oauth2-google-signup":
            OPERATION_TEXT = "";
            break;
        case "oauth2-google-signin":
            let txtAa;
            switch (message.data.role){
                case "admin":
                    txtAa = chalk.hex('#FFA500').bold("admin");
                    break;
                case "user":
                    txtAa = chalk.hex('#013220').bold("user");
                    break;
                default:
                    txtAa = chalk.hex('#000080').bold(message.data.role);
                    break;
            }

            OPERATION_TEXT = `[as: ${txtAa}]`;
            break;
        case "account-verify":
            OPERATION_TEXT = `[>> ${chalk.greenBright.bold(message.data.userID)}]`;
            break;
        case "stock-low":
            OPERATION_TEXT = ``;
            break;
        case "stock-change":
            OPERATION_TEXT = ``;
            break;
        case "payment-creation":
            OPERATION_TEXT = `[<orderId: ${chalk.green(message.data.orderID)}>]`;
            break;
        case "payment-success":
            OPERATION_TEXT = `[<orderId: ${chalk.green(message.data.orderID)}>][${chalk.bold("in Euros:")} ${message.data.total}]--> {< ${message.data.paymentIntent} >}`;
            break;
        case "order-creation":
            OPERATION_TEXT = `[<orderId: ${chalk.green(message.data.orderID)}>]`;
            break;
        case "order-paid":
            OPERATION_TEXT = `[<orderId: ${chalk.green(message.data.orderID)}>]`;
            break;
        case "order-validated":
            OPERATION_TEXT = `[<orderId: ${chalk.green(message.data.orderID)}>]`;
            break;
        case "delivery-initiated":
            OPERATION_TEXT = `[<orderId: ${chalk.green(message.data.orderID)}>] -> ${chalk.blueBright.bold("To")} -> [${message.data.countryCode} <|> ${message.data.deliveryMethod}]`;
            break;
        case "file-upload":
            OPERATION_TEXT = "";
            break;
        case "invoice-generation":
            OPERATION_TEXT = `[<Invoice Number: ${chalk.green(message.data.invoiceID)}>]`;
            break;
        case "email-verification":
            OPERATION_TEXT = "";
            break;
        case "email-orderconfirm":
            OPERATION_TEXT = "";
            break;
        default:
            OPERATION_TEXT = "";
            break;
    }

    return OPERATION_TEXT;
}

module.exports = {
    centerPadIp,
    classifySessionIdByRole,
    classifyAction,
    classifyOperation
}