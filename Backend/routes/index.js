const {
  addNote,
  deleteNote,
  editNote,
  getNotes,
  userLogin,
  userLogout,
  userCreate
} = require("../controllers/index");

module.exports = server => {
  server.route('/notes/:id')
    .get(getNotes)
    .delete(deleteNote);
  server.route('/notes')
    .put(addNote)
    .put(editNote)
  server.route('/notes/users').post(userCreate);
  server.route('/notes/login').post(userLogin)
  server.route('/notes/logout').post(userLogout)
};
