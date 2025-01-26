const { generateAccessToken } = require("../../utils/auth/token-generator");

function successOauthCallback(req, res) {
    const data = {
        role: req.user.role,
        email: req.user.email,
        user_id: req.user.id,
        oauthId: req.user.oauthId
    }
    const token = generateAccessToken(data);

    
    res.cookie('slogin_t', token, {httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 2});


    return res.send("<h1>Good Success</h1>");
}

function failedOAuthCallback(req, res) {
    return res.send("<h1>Bad Failed</h1>");
}

module.exports = {
    successOauthCallback,
    failedOAuthCallback
}