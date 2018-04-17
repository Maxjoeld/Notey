const passport = require('passport');
// authenticate is a reserved word
module.exports = (server) => {
  server.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    }),
  );

  // this route will be different than the other and will not kick in
  // to Oauth flow, instead it has the code that we need and will try and
  // handle the case a little different
  server.get('/auth/google/callback', passport.authenticate('google'));
};
