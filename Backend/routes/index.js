const {
  addNote,
  deleteNote,
  editNote,
  getNotes,
  userLogin,
  userLogout,
  userCreate,
} = require('../controllers/index');

module.exports = (server) => {
  // Note Routes //
  server.route('/notes/:id').get(getNotes);
  server.route('/notes/:id').delete(deleteNote);
  server.route('/notes').post(addNote);
  server.route('/notes').put(editNote);
  //  User Routes //
  server.route('/notes/users').post(userCreate);
  server.route('/notes/login').post(userLogin);
  server.route('/notes/logout').post(userLogout);
};
