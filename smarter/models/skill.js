const mongoose = require('mongoose');

const skillSchema = mongoose.Schema({
  name: { type: String },
  rating: { type: Number },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model('skill', skillSchema);