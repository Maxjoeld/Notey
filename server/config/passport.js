const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/dev');
const User = require('../models/users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
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
    console.log({ accessToken });
    console.log({ refreshtoken });
    console.log({ profile: profile.name.givenName });
    console.log('success');
    const existingUser = await User.findOne({ username: profile.emails[0].value });
    
    if (existingUser) {
      return done(null, existingUser);
    }
    let newUser = new User({
      username: profile.emails[0].value,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      img: profile.photos[0].value,
      password: null
    });

    const user = await newUser.save()
    done(null, user);
  },
));
