const { app } = require('./server');
const mongoose = require('mongoose');
// const keys = require('./config/dev');
const PORT = process.env.PORT || 5000;

mongoose.Promise = global.Promise;
// 'mongodb://localhost/fs-notes'
// http://localhost:5000
mongoose
  .connect('mongodb://localhost/fs-notes')
  .then(() => {
    console.log('Successfully connected to MongoDB');
  })
  .catch(err => {
    console.log('Error connecting to database: ', err);
  });

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
