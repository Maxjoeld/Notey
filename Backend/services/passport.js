const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config');
const mongoose = require('mongoose');

const gooUser = require('../models/gooUser');
// Internally google strategy has code that says "I'm known as google"
// which is why we use the term 'google' on line 31 to reference the google strat
passport.use(new GoogleStrategy(
  {
    clientID: keys.googleClientID || 'Google ID not found',
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
  },
  (accessToken, refreshtoken, profile, done) => {
    // console.log({ accessToken });
    // console.log({ refreshtoken });
    // console.log({ profile });
    // new gooUser({ googleId: profile.id });
  },
));
