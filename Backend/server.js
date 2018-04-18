const express = require('express');
const cors = require('cors');
// const passport = require('passport');
const keys = require('./config');
const routes = require('./routes/index');
// const cookieSession = require('cookie-session');
const session = require('express-session');
require('./services/passport');

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};
const app = express();

app.use(express.json());
app.use(cors(corsOptions));
app.use(session({
  secret: keys.seshSecret,
  resave: false,
  saveUninitialized: true,
  username: '',
}));
// app.use(passport.initialize());
// app.use(passport.session());

app.get('/me', (req, res) => {
  // Do NOT modify this route handler in any way
  res.send({ user: req.user, session: req.session });
});

// Two ways of running the routes through the server
// below you can just pass the required route and append the server to it
// which will call it immediately--line 26 and 28 are the same
// require('./routes/authRoutes')(app); // This is for the Oauth sign ins

routes(app); // this is for the basic auth && notes routes

module.exports = {
  app,
};
