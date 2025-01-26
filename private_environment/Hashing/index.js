var CryptoJS = require('crypto-js');
var SHA1_Function = require("crypto-js/sha1");

console.log(SHA1_Function("test").toString(CryptoJS.enc.Base64));
console.log("public/uploads/products")