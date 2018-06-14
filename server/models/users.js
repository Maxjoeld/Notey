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
  firstName: { 
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true, 
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

UserSchema.set('validateBeforeSave', false);
UserSchema.path('password').validate(function (value) {
  return v != null;
});

UserSchema.pre('save', function (next) {
 if (this.password !== null) {
   bcrypt.hash(this.password, SALT_ROUNDS, (err, hashed) => {
     if (err) return next(err);
     this.password = hashed;
     next();
   });
 }
});

UserSchema.methods.checkPassword = function (plainTextPW) {
  if (this.password !== null) {
  return bcrypt.compare(plainTextPW, this.password);
  }
};

module.exports = mongoose.model('User', UserSchema);

/* eslint-enable */
