const jwt = require('jsonwebtoken');

function generateAccessToken(data) {
    console.log("JWT:", process.env.JWT_SECRET_KEY);
    return jwt.sign(data, process.env.JWT_SECRET_KEY, { expiresIn: '2d' });
}

function verifyAccessToken(access_token) {
    let decoded;
    try {
        decoded = jwt.decode(access_token, process.env.JWT_SECRET_KEY);
    } catch (err) {}
    finally {
        return decoded;
    }
}

module.exports = {
    generateAccessToken,
    verifyAccessToken
}