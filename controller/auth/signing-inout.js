const { validationResult } = require('express-validator');
const userModel = require('../../model/user.model');
const jwt_lib = require('../../utils/auth/token-generator');

async function signIn(req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ error: errors.array() });
        }
        const user = await userModel.getUserByEmail(req.body.email);
        if (user) {
            // TODO: If User Signed Up with OAUTH
            // There's no necessity to check for verified_at
            if (user.password != req.body.password)
                return res.status(403).json({ error: "Wrong Password."});
            if ((user.role == "user" && !user.verified_at) && !(user.oauthId))
                return res.status(403).json({ error: "Email is not verified."})
        }
        else
            return res.status(403).json({ error: "Wrong Credentials."});
        const data = {
            role: user.role,
            email: user.email,
            user_id: user.id,
            oauthId: user.oauthId
        }
        const token = jwt_lib.generateAccessToken(data);
        res.cookie('slogin_t', token, {httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 2});

        return res.sendStatus(200);
    } catch (error) {
        console.error(error);
        return res.status(500).json({"error": "Internal Server Error"});
    }
}

function loginStatus(req, res) {
    const user_roles_opcodes = {
        "a": "admin",
        "u": "user"
    }


    try {
        const jwt_token = req.cookies && req.cookies['slogin_t'];

        const decoded_jwt = jwt_lib.verifyAccessToken(jwt_token);
        if (!decoded_jwt) {
            return res.status(403).json({error: "You are no longer logged in."});
        }

        const role_of_user = user_roles_opcodes[req.query.ac_mo] || "user";

        console.log(`ss ${role_of_user}`)

        if (role_of_user != decoded_jwt.role) {
            return res.status(403).json({error: "You are not the right role."});
        }

        return res.sendStatus(200);

    } catch (err) {
        return res.status(500).json({error: "Something Went Wrong."})
    }
}

function signOut(req, res) {
    try {
        res.clearCookie("slogin_t");
        return res.sendStatus(200);
    } catch (error) {
        console.error(error);
        return res.status(500).json({"error": "Internal Server Error"});
    }
}



module.exports = {
    signIn,
    signOut,
    loginStatus
}