// TODO: Implement OAuth Strategy for Facebook and Instagram
const passport = require('passport');
const userModel = require('../../model/user.model');
const { generateRandomString } = require('../misc/string-operations');

// Strategies (Google, LinkedIn, Instagram, Facebook)
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_OAUTH_REDIRECT_URL,
    passReqToCallback: true
}, async (req, accessToken, refreshToken, profile, done) => {
    console.log("google");
    console.log(profile);
    const randomPassword = generateRandomString(16);

    let userLast = {
        firstName: profile.name['givenName'],
        lastName: profile.name['familyName'],
        email: profile.emails[0].verified && profile.emails[0].value,
        providerName: profile.provider,
        oauthId: profile.id,
        password: randomPassword
    }
    let user = await userModel.findOrCreateUser(userLast);

    return done(null, user);
}));

// BUG: LINKEDIN OAUTH2 NON-FUNCTIONING !!!!!
// TODO: COMPANY NEEDS A LINKEDIN PAGE
// passport.use(new LinkedInStrategy({
//     clientID: process.env.LINKEDIN_CLIENT_ID,
//     clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
//     callbackURL: process.env.LINKEDIN_OAUTH_REDIRECT_URL,
//     scope: ['r_emailaddress', 'r_fullprofile'],
// },
// async (accessToken, refreshToken, profile, done) => {
//     // User profile is available here, you can handle authentication logic
//     console.log("linkedin");
//     console.log(profile);
//     return done(null, profile);
// }));

// passport.use(new InstagramStrategy({
//     clientID: ,
//     clientSecret: ,
//     callbackURL: "http://localhost:3000/auth/instagram/callback"
// },
// function(accessToken, refreshToken, profile, done) {
//     console.log('instagram');
//     console.log(profile);
//     // User profile is available here, you can handle authentication logic
//     return done(null, profile);
// }));

// passport.use(new FacebookStrategy({
//     clientID: "797026778972888",
//     clientSecret: "14bcadc761f1698b78853e0569178bd4",
//     callbackURL: "http://localhost:3000/auth/facebook/callback",
//     profileFields: ['id', 'emails', 'name']
// },
// function(accessToken, refreshToken, profile, done) {
//     // User profile is available here, you can handle authentication logic
//     console.log("facebook");
//     console.log(profile);
//     return done(null, profile);
// }));



passport.serializeUser((user, cb) => {
    cb(null, parseInt(user.id));
})

passport.deserializeUser(async (id, cb) => {
    const data = await userModel.getUserById(id);
    cb(null, data);
})

module.exports = passport;