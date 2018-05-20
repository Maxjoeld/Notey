const express = require('express');
const cors = require('cors');
const passport = require('passport');
const keys = require('./config');
const routes = require('./controllers/index');
const passportRoutes = require('./controllers/authRoutes');
const session = require('express-session');
const User = require('./models/users');
require('./services/passport');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

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

io.on('connection', function(socket){
  console.log('Sockets fully loaded ');

  socket.on('disconnect', function(){
    console.log('User Disconnected');
  });

  // Chat.find().limit(100).sort({_id: 1})
  //   .select('message')
  //   .then((res) => socket.emit('loadData', res))
  //   .catch((err) => console.log({err}));

  // sendStatus = (s) => {
  //   socket.emit('status',s);
  // }

  // socket.on('input', (message) => {
  //   let oldmsg = message;

  //   // let's make sure they included a name and message when they send it 
  //   if ( oldmsg === '') {
  //     // send error status
  //     return sendStatus('Please enter a name and message');
  //   }
  //     // insert message to database 
  //     const newMessage = new Chat({ message })
  //     newMessage.save(newMessage, () => {
  //       // emit output back to client 
  //       io.emit('output', [message]);

  //       // send status object 
  //       sendStatus({
  //         message: 'Message sent',
  //         clear: true
  //       })
  //     });
    
  // });

  // socket.on('Clear', (data) => {
  //   // remove all chats from collection
  //   chat.remove({}, () => {
  //     // let client know that messages have been cleared 
  //     socket.emit('cleared')
  //   });
  // });
});
io.listen(8000);

passportRoutes(app);
routes(app); 

module.exports = {
  app,
};
