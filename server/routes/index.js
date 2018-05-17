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
  app.get('/', getConversations);
  // Retrieve single conversation
  app.get('/:conversationId', getConversation);
  // Send reply in conversation
  app.post('/:conversationId', sendReply);
  // Start new conversation
  app.post('/new/:recipient', newConversation);
};
