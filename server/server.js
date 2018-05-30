const express = require('express');
const cors = require('cors');
const passport = require('passport');
const keys = require('./config');
const routes = require('./routes/index');
const passportRoutes = require('./controllers/authRoutes');
const session = require('express-session');
const User = require('./models/users');
require('./services/passport');

const app = express();
// const http = require('http').Server(app);
// const io = require('socket.io')(http);

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(session({
  secret: keys.seshSecret,
  resave: false,
  saveUninitialized: false,
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

// Socket.io

// io.on('connection', function(socket){
//   console.log('Sockets fully loaded ');
  
//   socket.on('enter conversation', (conversation) => {
//     socket.join(conversation);
//     console.log('joined ' + conversation);
//   });

//   socket.on('leave conversation', (conversation) => {
//     socket.leave(conversation);
//     console.log('left ' + conversation);
//   });

//   socket.on('new message', () => {
//     io.emit('refresh messages');
//   });

//   socket.on('disconnect', function(){
//     console.log('User Disconnected');
//   });

// });
// io.listen(8000);

app

passportRoutes(app);
routes(app); 

module.exports = {
  app,
};
