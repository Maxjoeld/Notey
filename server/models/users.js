/* eslint-disable */
const mongoose = require('mongoose');
const mongooseTypes = require('mongoose-types');
const bcrypt = require('bcrypt');

mongooseTypes.loadTypes(mongoose, 'email');

const { Schema } = mongoose;
const { Email } = mongoose.SchemaTypes;
const { ObjectId } = mongoose.Schema.Types;

const SALT_ROUNDS = 11;

const UserSchema = new Schema({
  username: {
    type: Email,
    unique: true,
    lowercase: true,
  },
  profile: {
    firstName: { type: String },
    lastName: { type: String }
  },
  password: {
    type: String,
    required: true,
  },
  googleId: {
    type: String,
    ref: 'gooUser'
  },
  img: {
    type: String,
  },
  notes: [
    {
      type: ObjectId,
      ref: 'Note',
    },
  ]
  },
{
  timestamps: true
});

UserSchema.pre('save', function (next) {
  bcrypt.hash(this.password, SALT_ROUNDS, (err, hashed) => {
    if (err) return next(err);
    this.password = hashed;
    next();
  });
});

UserSchema.methods.checkPassword = function (plainTextPW) {
  return bcrypt.compare(plainTextPW, this.password);
};

module.exports = mongoose.model('User', UserSchema);

/* eslint-enable */