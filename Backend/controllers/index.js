// Note Routes //
const {
  addNote,
  deleteNote,
  editNote,
  getNotes,
} = require('./notes');
// Auth Routes //
const {
  userLogin,
  userLogout,
  userCreate,
} = require('./auth');

module.exports = {
  addNote,
  deleteNote,
  editNote,
  getNotes,
  userLogin,
  userLogout,
  userCreate,
};
