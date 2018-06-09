const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config');
const mongoose = require('mongoose');
// const cookieSession = require('cookie-session');

const GooUser = require('../models/gooUser');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  GooUser.findById(id).then(user => {
    console.log({ user });
    done(null, user);
  });
});
// Internally google strategy has code that says "I'm known as google"
// which is why we use the term 'google' on line 31 to reference the google strat
passport.use(new GoogleStrategy(
  {
    clientID: keys.googleClientID || 'Google ID not found',
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
  },
  async (accessToken, refreshtoken, profile, done) => {
    // console.log({ accessToken });
    // console.log({ refreshtoken });
    // console.log({ profile: profile });
    console.log('success');
    const existingUser = await GooUser.findOne({ googleId: profile.id });
    if (existingUser) {
      return done(null, existingUser);
    }
    const newUser = new GooUser({
      googleId: profile.id,
      email: profile.emails[0].value,
      img: profile.photos[0].value,
    });
    const user = await newUser.save();
    done(null, user);
  },
));
