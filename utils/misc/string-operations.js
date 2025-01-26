function generateRandomString(length, special_chars = true) {
    const charsetWithSpecial = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+';
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomString = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * ((special_chars) ? charsetWithSpecial.length : charset.length));
      randomString += (special_chars) ? charsetWithSpecial[randomIndex] : charset[randomIndex];
    }
    return randomString;
}

// function toTwoDecimals(num) {
//   return parseFloat(num.to)
// }

module.exports = {
    generateRandomString
}