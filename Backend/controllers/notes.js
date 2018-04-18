/* eslint no-underscore-dangle: 0 */
const User = require('../models/users');
const Note = require('../models/notes');

const addNote = (req, res) => {
  const { title, content, userId } = req.body;
  const date = new Date();
  const newNote = new Note({ title, content, date });

  newNote
    .save()
    .then((note) => {
      const id = note._id;
      User.findOneAndUpdate({ _id: userId }, { $push: { notes: id } })
        .then(() => {
          res.status(201).json(note);
        })
        .catch(err => res.json(err));
    })
    .catch(err => res.json(err));
};

const deleteNote = (req, res) => {
  const { id } = req.params;
  Note.findByIdAndRemove(id)
    .then((deletedNote) => {
      res.json(deletedNote);
    })
    .catch(err => res.json(err));
};

const editNote = (req, res) => {
  const { editedNote, id } = req.body;
  Note.findByIdAndUpdate(id, editedNote, { new: true })
    .then((newNote) => {
      res.json(newNote);
    })
    .catch(err => res.json(err));
};

// const getNotes = (req, res) => {
//   const { id } = req.params;
//   User.findById(id, (err, user) => {
//     if (err) {
//       res.status(422);
//       res.json({ 'Error Fetching single User from DB: ': err.message });
//       return;
//     }
//     res.json(user);
//   });
// };

const getNotes = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .populate('notes')
    .then(finalData => {
      res.json(finalData);
    })
    .catch(err => res.json(err));
};

module.exports = {
  addNote,
  deleteNote,
  editNote,
  getNotes,
};
