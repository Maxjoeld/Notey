const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const keys = require('./config/keys');
const routes = require('./routes/index');
const passportRoutes = require('./controllers/authRoutes');
const session = require('express-session');
const path = require('path');
require('./config/passport');
// const User = require('./models/users');

const app = express();
const corsOptions = {
  origin: 'https://notey-app.herokuapp.com',
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

passportRoutes(app);
routes(app);

app.use(express.static(path.join(__dirname, '../client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'client', 'build', 'index.html'));
});

module.exports = {
  app,
};
