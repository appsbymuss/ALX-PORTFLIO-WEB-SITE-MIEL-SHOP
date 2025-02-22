var soap = require('soap');
const crypto = require('crypto');


const statusCodes = require('./statusCodes');
const merchant = process.env.MR_ENSEIGNE || 'BDTEST13';
const privateKey = process.env.MR_PRIVATEKEY || 'PrivateK';
const publicUrl = 'https://www.mondialrelay.com/';
const apiUrl = 'https://api.mondialrelay.com/Web_Services.asmx?WSDL';

// calculate Mondial Relay security key
const securityKey = (args) => {
    const content = args.filter(n => n).join('') + privateKey;
    return crypto.createHash('md5').update(content).digest('hex').toUpperCase();
}

const validateStatusCode = (code) => {
    if (code !== '0') {
        return false;
    }
    return true;
}

const createClient = (callback) => {
    return soap.createClient(apiUrl, (err, client) => {
        if (err) {
            return callback(err);
        }
        client.setEndpoint(apiUrl);
        return callback(null, client);
    });
}


// WSI2_RechercheCP
const searchZipCodes = (args) => {
    return new Promise((resolve, reject) => {
        return createClient((err, client) => {
        // return soap.createClient(apiUrl, (err, client) => {
            if (err) {
                return reject(err);
            }
            args.Security = securityKey(Object.values(args));
            client.WSI2_RechercheCP(args, (err, result) => {
                if (err) {
                    return reject(err);
                }
                if (validateStatusCode(result.WSI2_RechercheCPResult.STAT)) {
                    return resolve(result.WSI2_RechercheCPResult.Liste.Commune);
                } else {
                    return reject(statusCodes[result.WSI2_RechercheCPResult.STAT]);
                }
            });
        });
    });
}

// WSI4_PointRelais_Recherche
const searchPointsRelais = (args) => {
    return new Promise((resolve, reject) => {
        return createClient((err, client) => {
        // return soap.createClient(apiUrl, (err, client) => {
            client.setEndpoint(apiUrl);
            if (err) {
                console.log(err);
                return reject(err);
            }
            args.Security = securityKey(Object.values(args));
            console.log(args);
            client.WSI4_PointRelais_Recherche(args, (err, result) => {
                console.log("about to test")
                if (err) {
                    console.log(err);
                    return reject(err);
                }
                console.log("after test")

                if (validateStatusCode(result.WSI4_PointRelais_RechercheResult.STAT)) {
                    return resolve(result.WSI4_PointRelais_RechercheResult.PointsRelais && result.WSI4_PointRelais_RechercheResult.PointsRelais.PointRelais_Details);
                } else {
                    return reject(statusCodes[result.WSI4_PointRelais_RechercheResult.STAT]);
                }
            });
        });
    });
}

// WSI2_CreationEtiquette
const createLabel = (args) => {
    return new Promise((resolve, reject) => {
        return createClient((err, client) => {
        // return soap.createClient(apiUrl, (err, client) => {
            if (err) {
                return reject(err);
            }

            args.Security = securityKey(Object.values(args));
            client.WSI2_CreationEtiquette(args, (err, result) => {
                if (err) {
                    return reject(err);
                }
                if (validateStatusCode(result.WSI2_CreationEtiquetteResult.STAT)) {
                    return resolve(result.WSI2_CreationEtiquetteResult);
                } else {
                    return reject(statusCodes[result.WSI2_CreationEtiquetteResult.STAT]);
                }
            });
        });
    })
}

// WSI3_GetEtiquettes
const getLabels = (args) => {
    return new Promise((resolve, reject) => {
        return createClient((err, client) => {
        // return soap.createClient(apiUrl, (err, client) => {
            if (err) {
                return reject(err);
            }
            args.Security = securityKey(Object.values(args));
            client.WSI3_GetEtiquettes(args, (err, result) => {
                if (err) {
                    return reject(err);
                }
                
                if (validateStatusCode(result.WSI3_GetEtiquettesResult.STAT)) {
                    return resolve(result.WSI3_GetEtiquettesResult);
                } else {
                    return reject(statusCodes[result.WSI3_GetEtiquettesResult.STAT]);
                }
            });
        });
    });
}

// WSI2_STAT_Label
const getStatMessage = (args) => {
    return new Promise((resolve, reject) => {
        return createClient((err, client) => {
        // return soap.createClient(apiUrl, (err, client) => {
            if (err) {
                return reject(err);
            }
            args.Security = securityKey(Object.values(args));
            client.WSI2_STAT_Label(args, (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result.WSI2_STAT_LabelResult);
            });
        });
    });
}

// WSI2_TracingColisDetaille
const getTracking = (args) => {
    return new Promise((resolve, reject) => {
        return createClient((err, client) => {
        // return soap.createClient(apiUrl, (err, client) => {
            if (err) {
                return reject(err);
            }
            args.Security = securityKey(Object.values(args));
            client.WSI2_TracingColisDetaille(args, (err, result) => {
                if (err) {
                    return reject(err);
                }
                
                if (validateStatusCode(result.WSI2_TracingColisDetailleResult.STAT)) {
                    return resolve(result.WSI2_TracingColisDetailleResult);
                } else {
                    return reject(statusCodes[result.WSI2_TracingColisDetailleResult.STAT]);
                }
            });
        });
    });
}

module.exports = {
    publicUrl,
    apiUrl,
    statusCodes,
    securityKey,
    validateStatusCode,
    searchZipCodes,
    searchPointsRelais,
    createLabel,
    getLabels,
    getStatMessage,
    getTracking,
};