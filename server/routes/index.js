// Note Routes //
const {
  addNote, deleteNote, editNote, getNotes,
} = require('../controllers/notes');
// Auth Routes //
const { userLogin, userLogout, userCreate } = require('../controllers/auth');
// Chat Routes
const {
  allContacts, getConversations, getConversation,
  newConversation, sendReply, deleteConversation,
} = require('../controllers/convo');

const { sendUserError, sessionAuth } = require('../utils/authenticate');


module.exports = (app) => {
  // Note Routes //
  app.route('/notes/:id').get(getNotes);
  app.route('/notes/:id').delete(deleteNote);
  app.route('/notes').post(addNote);
  app.route('/notes').put(editNote);
  //  User Routes //
  app.route('/notes/register').post(userCreate);
  app.route('/notes/login').post(userLogin);
  app.route('/notes/logout').post(userLogout);

  // Chat Routes //
  app.route('/notes/chat/allContacts').get(allContacts);

  app.get('/notes/chat/convo/:conversationId', sessionAuth, getConversation);
  app.get('/notes/chat/getConversations', getConversations);
  app.post('/notes/chat/reply/:conversationId', sessionAuth, sendReply);
  app.post('/notes/chat/new/:recipient', sessionAuth, newConversation);
  app.get('/notes/me/1', (req, res) => {
    res.send({ user: req.user, session: req.session });
  });

  app.get('/notes/islogged', (req, res, next) => {
    if (!req.session.user) {
      sendUserError('User is not logged in', res);
      return;
    }
    console.log({ session: req.session });
    res.json({ user: req.session.user, profile: req.session.profile });
    next();
  });
};

