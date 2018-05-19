const jwt = require('jsonwebtoken');
const { mySecret } = require('../config');
const STATUS_USER_ERROR = 422;

const sendUserError = (err, res) => {
  res.status(STATUS_USER_ERROR);
  if (err && err.message) {
    res.json({ message: err.message, stack: err.stack });
  } else {
    res.json({ error: err });
  }
};
const jwtauth = (req, res, next) => {
  const token = req.get('Authorization');
  if (token) {
    jwt.verify(token, mySecret, (err, jwtObj) => {
      if (err) return res.status(422).json(err);
      req.jwtObj = jwtObj;
      next();
    });
  } else {
    return res.status(403).json({ error: 'No token provided' });
  }
};

const sessionAuth = (req,res,next) => {
  if (!req.session.user) {
    return sendUserError('User is not authenticated', res)
  }
    next();
};


const restricted = (req, res, next) => {
  const path = req.path;
  if (/restricted/.test(path)) {
    if (!req.session.user) {
      sendUserError('User not authorized');
      return;
    }
  }
  next();
};

module.exports = {
  jwtauth,
  sessionAuth,
  sendUserError,
  restricted
};