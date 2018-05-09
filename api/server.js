const express = require('express');
const cors = require('cors');
const passport = require('passport');
const keys = require('./config');
const routes = require('./routes/index');
const passportRoutes = require('./routes/authRoutes');
const session = require('express-session');
const User = require('./models/users');
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
  saveUninitialized: false,
}));
// app.use(passport.initialize());
// app.use(passport.session());

app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

app.get('/me', (req, res) => {
  // Do NOT modify this route handler in any way
  res.send({ user: req.user, session: req.session });
});

app.get('/notes/chat', (req, res) => {
  User.find({})
    .select( 'username')
    .then(contacts => {
      res.status(201).json(contacts);
    })
    .catch(err => {
      res.status(400).send({ error: err });
    });
});

passportRoutes(app);
routes(app); 

module.exports = {
  app,
};


// app.get('/me', (req, res) => {
//   // Do NOT modify this route handler in any way
//   res.send({ user: req.user, session: req.session });
// });