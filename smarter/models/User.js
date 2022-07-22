const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
  },
  contact: {
    type: String,
  },
  location: {
    type: String,
  },
  about: {
    type: String,
  },
});

module.exports = mongoose.model('User', userSchema);