const mongoose = require('mongoose');
require('dotenv').config();

module.exports = async function () {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('Successfully connected to database'))
    .catch(err => console.log('Database connection unsuccessful: ', err));
};
