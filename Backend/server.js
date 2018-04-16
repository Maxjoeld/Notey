const express = require('express');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config');
// const { googleClientID, googleClientSecret } = require('./config');
const routes = require('./routes/index');

const server = express();
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

server.use(express.json());
server.use(cors(corsOptions));
// Internally google strategy has code that says "I'm known as google"
// which is why we use the term 'google' on line 31 to reference the google strat
passport.use(new GoogleStrategy(
  {
    clientID: keys.googleClientID || 'Google ID not found',
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
  },
  (accessToken, refreshtoken, profile, done) => {
    console.log({ accessToken });
    console.log({ refreshtoken });
    console.log({ profile });
  },
));
// authenticate is a reserved word
server.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
}));


// this route will be different than the other and will not kick in 
// to Oauth flow, instead it has the code that we need and will try and
// handle the case a little different
server.get('/auth/google/callback', passport.authenticate('google'));

server.use(session({
  secret: keys.seshSecret,
  resave: true,
  saveUninitialized: false,
}));

routes(server);

module.exports = {
  server,
};
