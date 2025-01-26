const { verifyAccessToken } = require("../utils/auth/token-generator");

const authorize = (roles) => {
    return (req, res, next) => {
        const jwt_token = req.cookies && req.cookies.slogin_t;
        const user_data = verifyAccessToken(jwt_token);

        if (!user_data || !roles.includes(user_data.role)) {
            return res.status(403).json({ error: "You are not authorized to access this resource" });
        }
        // BUG: POSSIBLE SECURITY HAZARD !!!!
        // BUG: CHECK AND RECHECK !!!!
        
        req.user = user_data;
        next();
    };
};

module.exports = {
    authorize
}