const express = require('express');
const session = require('express-session');
const cors = require('cors');

// const { secret } = require('./config');
const routes = require('./routes/index');

const server = express();
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

server.use(express.json());
server.use(cors(corsOptions));
// server.options('*', cors());

server
  .use(session({
    secret: 'e5SPiqsEtjexkTj3Xqovsjzq8ovjfgVDFMfUzSmJO21dtXs4re',
    resave: true,
    saveUninitialized: false,
  }));

routes(server);

module.exports = {
  server,
};
