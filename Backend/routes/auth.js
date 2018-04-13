const User = require('../models/users');

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
  const { username, password} = req.body;
  const lowercaseUsername = username.toLowerCase();
  User.findOne({ username: lowercaseUsername })
    .then(user => {
      if (user) {
        user
          .checkPassword(password)
          .then(verified => {
            if (verified) {
              req.session.username = user.username;
              res.json(user._id)
              return;
            } 
            res.status(401).json({ error: "password don't match" });
          })
          .catch(err => {
            res.json({ errorCheckingPassWord: err })
          });
      } else {
        res.status(401).json({ error: 'No user with that username in our DB' });
      }
    })
    .catch(err => {
      res.status(403).json({ error: 'Invalid Username/Password', ...err })
    })
};

const userLogout = (req, res) => {
  if (!req.session.username) res.json('User is not logged in.');
  res.session.destroy();
  res.send(req.session);
}


module.exports = {
  userCreate,
  userLogin,
  userLogout
}