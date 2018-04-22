const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;
const mongooseTypes = require('mongoose-types');

const oAuth = new Schema({
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
  notes: [
    {
      type: ObjectId,
      ref: 'Note',
    },
  ],
});

module.exports = mongoose.model('oAuth', oAuth);
