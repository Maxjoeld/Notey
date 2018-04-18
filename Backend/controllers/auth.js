const User = require('../models/users');
const session = require('express-session');
const STATUS_USER_ERROR = 422;

const sendUserError = (err, res) => {
  res.status(STATUS_USER_ERROR);
  if (err && err.message) {
    res.json({ message: err.message, stack: err.stack });
  } else {
    res.json({ error: err });
  }
};

const userCreate = (req, res) => {
  console.log(req);
  const { username, password } = req.body;
  const user = new User({ username, password });
  user
    .save()
    .then(newUser => {
      res.status(201).send(newUser);
    })
    .catch(err => {
      res.status(400).send({ err });
    });
};

// const userLogin = (req, res) => {
//   const { username, password } = req.body;
//   if (!username) {
//     sendUserError('username undefined', res);
//     return;
//   }
//   User.findOne({ username }, (err, user) => {
//     if (err || user === null) {
//       sendUserError('No user found at that id', res);
//       return;
//     }
//     user
//       .checkPassword(password)
//       .then((response) => {
//         if (!response) throw new Error();
//         req.session.username = username;
//         req.user = user;
//       })
//       .then(() => {
//         res.json({ success: true, user });
//       })
//       .catch((error) => {
//         return sendUserError('User does not exist at that id ', res);
//       });
//   });
// };

const userLogin = (req, res) => {
  const { username, password } = req.body;
  const lowercaseUsername = username.toLowerCase();
  User.findOne({ username: lowercaseUsername })
    .then(user => {
      if (user) {
        user
          .checkPassword(password)
          .then(verified => {
            if (verified) {
              req.session.username = user.username;
              // res.send(user._id);
              res.json({ user: req.user, session: req.session });
            } else res.status(401).json({ error: "passwords don't match" });
          })
          .catch(err => {
            res.json({ errorCheckingPassword: err });
          });
      } else
        res.status(401).json({ error: 'No user with that username in our DB' });
    })
    .catch(err => {
      res.status(403).json({ error: 'Invalid Username/Password', ...err });
    });
};

const userLogout = (req, res) => {
  // res.json(req.session);
  if (!req.session.username) res.json({ notlogged: req.session });
  req.session.destroy();
  res.send({ success: req.session });
};


module.exports = {
  userCreate,
  userLogin,
  userLogout,
};
