const express = require('express');
const session = require('express-session');
const cors = require('cors');

const { secret } = require('./config');
// const routes = require('./api/routes/routes');

const server = express();
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

server.use(express.json());
server.use(cors(corsOptions));
// server.options('*', cors());

server.use(
  session({
    secret: secret,
    resave: true,
    saveUninitialized: false,
  })
);



module.exports = {
  server,
};