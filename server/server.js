const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const keys = require('./config');
const routes = require('./routes/index');
// const passportRoutes = require('./controllers/authRoutes');
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

// conn.once('open', () => {
//   console.log('Connection open');
//   var gfs = Grid(conn.db);

//   // when connection is open, create write stream with the name to store
//   // file as in the DB
//   const writeStream = gfs.createWriteStream({
//     filename: 'Nico2.png'
//   });
//   // create a read-strea, from where rhe video currently is (imgPath)
//   // and pipe it into the database (through write-stream)
//   fs.createReadStream(imgPath).pipe(writeStream);

//   writeStream.on('close', (file) => {
//     // do something with 'file'
//     // console logging that it was written successfully
//     console.log(file.filename + 'Written to DB');
//   })
// });




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

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});


const oAuth = require('./models/oAuth');
// authenticate is a reserved word
  
  app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'], }),
  );

  // this route will be different than the other and will not kick in
  // to Oauth flow, instead it has the code that we need and will try and
  // handle the case a little different
  app.get('/auth/google/callback', passport.authenticate('google'), (req, res, next) => {
    // this is checking is already an existing user that wanted to use 0auth
    console.log(success);
    const { googleId, email , img } = req.user;
    const oauthUser = req.user.email;
    const mongoId  = req.user.id;
    // if user is already a user in the database and decided to use google to login
    User.findOneAndUpdate({ username: oauthUser }, { $set: { googleId: mongoId }}, (err, user) => {
      if (err) return console.log({ 'Could not find user': err });
      // if its a brand new user in the database and have 
      // not used our original auth(user, password) method
      if (user === null) {
        const newUser = new oAuth({ googleId, username: email, img })
        User.create(newUser)
        .then(user => {
          // req.session.username = oauthUser;
          req.session.user = user._id;
          next();
          res.status(201).json({success: "User saved successfully", session: req.session, userId: user._id })
          // res.redirect('http://localhost:3000/')
        })
        .catch(error => res.status(500).json({ msg: 'Could not save user', error }))
        return;
      }
      // if theyre a current user and decided to use google to login
      res.json({ connected: "Found existing data in the database", user});
    });
  });

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

// passportRoutes(app);
routes(app); 

module.exports = {
  app,
};
