const jwt = require('jsonwebtoken');
const keys = require('../config');
const User = require('../models/users');
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

const userLogin = (req, res) => {
  const { username, password } = req.body;
  if (!username) {
    sendUserError('username undefined', res);
    return;
  }
  User.findOne({ username }, (err, user) => {
    if (err || user === null) {
      sendUserError('No user found at that id', res);
      return;
    }
    user
      .checkPassword(password)
      .then((response) => {
        if (!response) throw new Error();
        req.session.username = username;
        req.user = user;
      })
      .then(() => {
        // res.json({ success: true, user });
        res.json(user._id);
      })
      .catch((error) => {
        return sendUserError('User does not exist at that id ', res);
      });
  });
};

// const userLogin = (req, res) => {
//   let { username, password } = req.body;
//   username = username.toLowerCase();
//   if (!username || !password) {
//     res
//       .status(422)
//       .json({ error: 'You need to provide a username and password' });
//   }
//   // Find the user object matching the username
//   User.findOne({ username }, (err, user) => {
//     if (err) {
//       return res.status(403).json({ error: 'Invalid Username/Password' });
//     }
//     if (user === null) {
//       res.status(422).json({ error: 'User does not exist' });
//       return;
//     }
//     // Use the method on the User model to hash and check PW
//     user.checkPassword(password, (nonMatch, hashMatch) => {
//       if (nonMatch !== null) {
//         res.status(422).json({ error: 'Incorrect password' });
//         return;
//       }
//       if (hashMatch) {
//         const payload = {
//           username: user.username,
//         };
//         const token = jwt.sign(payload, keys.seshSecret);
//         res.json({ token });
//       }
//     });
//   });
// };

const userLogout = (req, res) => {
  // res.json(req.session);
  // console.log({req.session.username});
  delete req.session.username;
  res.status(200).json({ msg: 'Logged out.' });
};


module.exports = {
  userCreate,
  userLogin,
  userLogout,
};
