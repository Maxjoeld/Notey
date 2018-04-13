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
  const { username, password } = req.body;
  const user = new User({ username, password });
  user
    .save()
    .then(newUser => {
      res.status(201).send(newUser);
    })
    .catch(err => {
      res.status(400).send({ err});
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
        res.json({ success: true, user});
      })
      .catch((error) => {
        return sendUserError('User does not exist at that id ', res);
      });
  });
};

const userLogout = (req, res) => {
  if (!req.session.username) {
    sendUserError('User is not logged in', res);
    return;
  }
  req.session.username = null;
  res.json({ success: true });
}


module.exports = {
  userCreate,
  userLogin,
  userLogout
}