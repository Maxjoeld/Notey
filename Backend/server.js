const express = require('express');
const cors = require('cors');
const passport = require('passport');
const keys = require('./config');
const routes = require('./routes/index');
const passportRoutes = require('./routes/authRoutes');
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
  saveUninitialized: false,
  username: '',
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

passportRoutes(app);
routes(app); 

module.exports = {
  app,
};


// app.get('/me', (req, res) => {
//   // Do NOT modify this route handler in any way
//   res.send({ user: req.user, session: req.session });
// });