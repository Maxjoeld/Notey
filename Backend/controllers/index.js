const { addNote, deleteNote, editNote, getNotes } = require('./notes');
const { userLogin, userLogout, userCreate } = require('./auth');

module.exports = {
  addNote,
  deleteNote,
  editNote,
  getNotes,
  userLogin,
  userLogout,
  userCreate,
}