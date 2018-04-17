const mongoose = require('mongoose');

const { Schema } = mongoose;

const GooUser = new Schema({
  googleId: String,
});

module.exports = mongoose.model('gooUser', GooUser);
