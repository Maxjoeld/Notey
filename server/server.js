const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const keys = require('./config');
const routes = require('./routes/index');
const passportRoutes = require('./controllers/authRoutes');
const session = require('express-session');
const User = require('./models/users');
require('./services/passport');

// where to find the picture/video in the filesystem that we'll be storing in the DB
const Grid = require('gridfs-stream');
const fs = require('fs');
const path = require('path');
const conn = mongoose.connection;
const imgPath = path.join(__dirname, './images/Nico2.png');
Grid.mongo = mongoose.mongo;

conn.once('open', () => {
  console.log('Connection open');
  var gfs = Grid(conn.db);

  // when connection is open, create write stream with the name to store
  // file as in the DB
  const writeStream = gfs.createWriteStream({
    filename: 'Nico2.png'
  });
  // create a read-strea, from where rhe video currently is (imgPath)
  // and pipe it into the database (through write-stream)
  fs.createReadStream(imgPath).pipe(writeStream);

  writeStream.on('close', (file) => {
    // do something with 'file'
    // console logging that it was written successfully
    console.log(file.filename + 'Written to DB');
  })
});




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
