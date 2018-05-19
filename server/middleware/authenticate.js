const jwt = require('jsonwebtoken');
const { mySecret } = require('./config');

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
  if (req.session.user) {
    next();
  } else {
    return res.status(403).json({ error: 'User is not authenticated'})
  }
};

module.exports = {
  authenticate,
};