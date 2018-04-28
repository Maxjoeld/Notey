const passport = require('passport');
const User = require('../models/users');
const oAuth = require('../models/oAuth');
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
  app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
    // this is checking is already an existing user that wanted to use 0auth
    const { googleId, email , img } = req.user;
    const oauthUser = req.user.email;
    const mongoId  = req.user.id;
    // if user is already a user in the database and decided to use google to login
    User.findOneAndUpdate({ username: oauthUser }, { $set: { googleId: mongoId }}, (err, user) => {
      if (err) return console.log({ 'Could not find user': err });
      // if its a brand new user in the database and have 
      // not used our original auth(user, password) method
      if (user === null) {
        const newUser = new oAuth({ googleId, email, img })
        oAuth.create(newUser)
        .then(user => {
          req.session.username = oauthUser;
          req.session.user = user._id;
          res.status(201).json({success: "User saved successfully", session: req.session, userId: user._id })
          // res.redirect('http://localhost:3000/')
        })
        .catch(error => res.status(500).json({ msg: 'Could not save user', error }))
        return;
      }
      // if theyre a current user and decided to use google to login
      res.json({ connected: "Found existing data in the database", user});
    });
  });

  app.get('/auth/:id', (req, res) => {
    const { id } = req.params;
    User.findById(id)
      .populate('googleId')
      .then(finalData => {
        res.json(finalData);
      })
      .catch(err => res.json(err));
  });

  // req represents the incoming response - res represent the outgoing response
  app.get('/auth/logout', (req, res) => {
    // logout is built in and klls the id and logs out the user
    // req.session();
    delete req.session.passport;
    res.json(req.user);
  });

  app.get('/auth/user', (req, res) => {
    res.json(req.user);
  });
};
