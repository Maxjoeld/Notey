const passport = require('passport');
const User = require('../models/users');
const oAuth = require('../models/oAuth');
const { sessionAuth } = require('../utils/authenticate');
// authenticate is a reserved word
module.exports = (app) => {
  
  app.get('/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    }),
  );

  // this route will be different than the other and will not kick in
  // to Oauth flow, instead it has the code that we need and will try and
  // handle the case a little different
  app.get('/auth/google/callback', passport.authenticate('google'), (req, res, next) => {
    req.session.user = req.user._id
    res.redirect('http://localhost:3000/create')
    // res.json({ session: req.session.user })
    next();
  });

  // req represents the incoming response - res represent the outgoing response
  app.get('/auth/logout', (req, res) => {
    // logout is built in and klls the id and logs out the user
    // req.session();
    delete req.session.user;
    res.json(req.user);
  });

};
