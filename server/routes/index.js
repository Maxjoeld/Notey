const {
  addNote,
  deleteNote,
  editNote,
  getNotes,
  userLogin,
  userLogout,
  userCreate,
  getContact,
  allContacts,
  getConversations,
  getConversation,
  newConversation,
  sendReply,
  deleteConversation
} = require('../controllers/index');
// const { authenticate } = require('./authenticate');

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
  app.route('/notes/getchat').get(allContacts);
  app.route('/notes/chat').post(getContact);
  app.get('/notes/getconvos', getConversations);
  app.get('/notes/convo/:conversationId', getConversation);
  app.post('/notes/reply:conversationId', sendReply);
  app.post('/notes/new/:recipient', newConversation);
};
