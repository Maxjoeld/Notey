const { app } = require('./server');
const mongoose = require('mongoose');
const socketIO = require('socket.io');
const mongo = require('mongodb').MongoClient;
const client = require('socket.io').listen(5001).sockets;

const PORT = process.env.PORT || 5000;

mongoose.Promise = global.Promise;

mongo.connect('mongodb://localhost/fs-notes', (err, db) => {
  if(err) {
    throw err;
  }
  console.log('Mogodb is connected baby');
  // Connect to Socket.io
  client.on('connection', (socket) => {
    let chat = db.collection('chats');

    // Create function to send status 
    sendStatus = (s) => {
      socket.emit('status',s);
    }
    // Get chats from mongo collection
    // limits chat to 100 messages I believe ? 
    // This is fetching the chat messages which are limited to 100. Then taking the 
    // result and emitting it to the client
    chat.find().limit(100).sort({_id: 1}).toArray((err, res)=> {
      if (err) {
        throw err;
      }
      //  Emit the messages if theres no error 
      socket.emit('output', res);
    });
    // Now Handle messages that are being emitted from the client 
    // data is === data sent from the client 
    socket.on('input', (data) => {
      let name = data.name;
      let message = data.message;

      // let's make sure they included a name and message when they send it 
      if (name === '' || message === '') {
        // send error status
        sendStatus('Please enter a name and message');
      } else {
        // insert message to database 
        chat.insert({ name, message}, () => {
          // emit output back to client 
          client.emit('output', [data]);

          // send status object 
          sendStatus({
            message: 'Message sent',
            clear: true
          })
        });
      }
    });

    // handle Clear
    socket.on('Clear', (data) => {
      // remove all chats from collection
      chat.remove({}, () => {
        // let client know that messages have been cleared 
        socket.emit('cleared')
      });
    });

  });

});

mongoose
  .connect('mongodb://localhost/fs-notes')
  .then(() => {
    console.log('Successfully connected to MongoDB');
  })
  .catch(err => {
    console.log('Error connecting to database: ', err);
  });

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
