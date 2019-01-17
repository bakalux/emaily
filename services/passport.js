const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');

const keys = require('../config/keys');

passport.use(new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback'
},
  (accessToken, refreshToken, profile, done) => {
    console.dir({
      "accessToken": accessToken,
      "refreshToken": refreshToken,
      "profile": profile
    })
  }
));
