const passport = require('passport');
const User = require('../models/users');
// authenticate is a reserved word
module.exports = (app) => {
  app.get(
'/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    }),
  );

  // this route will be different than the other and will not kick in
  // to Oauth flow, instead it has the code that we need and will try and
  // handle the case a little different
  app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
    // this is checking is already an existing user that wanted to use 0auth
    // if (
    const oauthUser = req.user.email;
    const googleId  = req.user.id;
    User.findOne({ username: oauthUser }, (err, user) => {
      if (err) return console.log({ 'Could not find user': err });
      user.set({ googleId });
      res.json(user);
      user.save((err, updateduser) => {
        if (err) return console.log({'Could not save user to database':err});
        res.json(updateduser);
      });
    });
  });

  app.get('/getdata/:id', (req, res) => {
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
