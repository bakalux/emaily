const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const passport = require('passport');

const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
})

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    })
})

passport.use(new GoogleStrategy(
  {
    callbackURL: '/auth/google/callback',
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    proxy: true
  },
  (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleID: profile.id })
      .then(existingUser => {
        if(existingUser) {
          // We already have a record with the given profile ID
          done(null, existingUser);
        } else {
          // We don't have a user record with this ID, make a new record
          new User({ googleID: profile.id }).save()
            .then(user => {
              done(null, user);
            })
        }
      });
  }
));
