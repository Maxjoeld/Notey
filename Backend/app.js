const { server } = require('server');
const mongoose = require('mongoose');

const PORT = process.env.PORT;

mongoose.Promise = global.Promise;
mongoose  
  .connect