// Note Routes //
const { addNote, deleteNote, editNote, getNotes } = require('./notes');
// Auth Routes //
const { userLogin, userLogout, userCreate } = require('./auth');
// Chat Routes
const {
getContact,
allContacts,
getConversations,
getConversation,
newConversation,
sendReply,
deleteConversation } = require('./convo');


module.exports = {
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
};
