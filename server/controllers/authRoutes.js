const passport = require('passport');

module.exports = (app) => {
  
  app.get('/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    }),
  );
  app.get('/auth/google/callback', passport.authenticate('google'), (req, res, next) => {
    req.session.user = req.user._id
    req.session.profile = req.user;
    res.redirect('http://localhost:3000/')
    // res.json({ session: req.session.user })
    next();
  });

};
