const mongoose = require('mongoose');

const { Schema } = mongoose;

const GooUser = new Schema({
  googleId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
});

module.exports = mongoose.model('gooUser', GooUser);
