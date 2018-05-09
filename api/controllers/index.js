// Note Routes //
const { addNote, deleteNote, editNote, getNotes } = require('./notes');
// Auth Routes //
const { userLogin, userLogout, userCreate } = require('./auth');
const { getContact, allContacts } = require('./convo');

module.exports = {
  addNote,
  deleteNote,
  editNote,
  getNotes,
  userLogin,
  userLogout,
  userCreate,
  getContact,
  allContacts
};
