const passport = require('passport');
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
  app.get('/auth/google/callback', passport.authenticate('google'));
  // req represents the incoming response - res represent the outgoing response
  app.get('/api/logout', (req, res) => {
    // logout is built in and klls the id and logs out the user 
    req.logout();
    res.json(req.user);
  });
  app.get('/api/current_user', (req, res) => {
    res.json(req.user);
  });
};
