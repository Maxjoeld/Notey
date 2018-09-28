const { app } = require('./server');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const PORT = process.env.PORT || 5000;

mongoose.Promise = global.Promise;
// 'mongodb://localhost/fs-notes'
mongoose
  .connect('mongodb://Mjd809:R1d3%40%4015%40b@ds115931.mlab.com:15931/notey')
  .then(() => {
    console.log('Successfully connected to MongoDB');
  })
  .catch(err => {
    console.log('Error connecting to database: ', err);
  });

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
