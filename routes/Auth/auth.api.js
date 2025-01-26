const express = require('express');
const passport = require('../../utils/auth/passport-oauth');
const { successOauthCallback, failedOAuthCallback } = require('../../controller/auth/oauth-login-status-handling');
const { signIn, signOut, loginStatus } = require('../../controller/auth/signing-inout');
const { signUp, verifyAccount } = require('../../controller/auth/signing-up');
const { body } = require('express-validator');
const { handlePushSubscription } = require('../../controller/auth/push-service');
const { sendAdminsNotification } = require('../../utils/notifications/push');
const { authorize } = require('../../middleware/authorization');
const router = express.Router();

router.post('/login', [
    body('email').isEmail().notEmpty(),
    body('password').isString().notEmpty()
], signIn);

router.post('/sign-up',[
    body('firstName').isString().notEmpty(),
    body('lastName').isString().notEmpty(),
    body('numberPhone').isMobilePhone().notEmpty(),
    body('gender').isIn(['M', 'F', 'autre', 'nonSpecifie']).optional(),
    body('email').isEmail().notEmpty(),
    body('password').isString().notEmpty()
], signUp);

router.get('/sign-up/verify', verifyAccount);

router.get('/logout', signOut);

router.get('/isloggedin', loginStatus);

// Push-Notification service Subscription Endpoint:
router.post('/subscribe-push', authorize(["admin"]), handlePushSubscription);
router.post('/initiate-push', authorize(["admin"]), sendAdminsNotification);


// [x] TODO: Must implement OAuth for Google (using Sessions to pass JWT)
// // Initiate Google OAuth 2.0 authentication
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Handle callback after Google has authenticated the user
router.get('/google/callback', passport.authenticate('google',
    {
        successRedirect: '/auth/oauth-success',
        failureRedirect: '/auth/oauth-failed'
    }
));

router.get('/linkedin', passport.authenticate('linkedin'));

router.get('/linkedin/callback', passport.authenticate('linkedin',
    {
        successRedirect: '/auth/oauth-success',
        failureRedirect: '/auth/oauth-failed'
    }
));

router.get('/instagram', passport.authenticate('instagram'));

router.get('/instagram/callback', passport.authenticate('instagram',
    {
        successRedirect: '/auth/oauth-success',
        failureRedirect: '/auth/oauth-failed'
    }
));

router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback', passport.authenticate('facebook',
    {
        successRedirect: '/auth/oauth-success',
        failureRedirect: '/auth/oauth-failed'
    }
));

router.get('/oauth-success', successOauthCallback);
router.get('/oauth-failed', failedOAuthCallback);

module.exports = router;
