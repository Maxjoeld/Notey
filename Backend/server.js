const express = require('express');
const session = require('express-session');
const cors = require('cors');

const keys = require('./config');
require('./services/passport');
const routes = require('./routes/index');


const server = express();
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

server.use(express.json());
server.use(cors(corsOptions));
server.use(session({
  secret: keys.seshSecret,
  resave: true,
  saveUninitialized: false,
}));
// Two ways of running the routes through the server 
// below you can just pass the reuired route and append the server to it
// which will call it immediately--line 26 and 28 are the same 
require('./routes/authRoutes')(server); // This is for the Oauth sign ins

routes(server); // this is for the basic auth && notes routes

module.exports = {
  server,
};
