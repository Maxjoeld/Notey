// Note Routes //
const { addNote, deleteNote, editNote, getNotes } = require('./notes');
// Auth Routes //
const { userLogin, userLogout, userCreate } = require('./auth');
// Chat Routes
const { getContact,allContacts,getConversations, getConversation,
newConversation,sendReply, deleteConversation} = require('./convo');
const { sessionAuth } = require('../utils/authenticate');

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
  app.route('/notes/chat').post(getContact);
  app.route('/notes/chat/getchat').get(allContacts);

  app.get('/notes/chat/convo/:conversationId',sessionAuth, getConversation);
  app.get('/notes/chat/convo', getConversations);
  app.post('/notes/chat/reply/:conversationId', sessionAuth, sendReply);
  app.post('/notes/chat/new/:recipient',sessionAuth, newConversation);

  
  app.get('/notes/me/1', (req, res) => {
  // Do NOT modify this route handler in any way
  res.send({ user: req.user, session: req.session });
});
};

