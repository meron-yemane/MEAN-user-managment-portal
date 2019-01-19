const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  roles: [String],
  isActive: String,
  creationDate: Number
});

const User = mongoose.model('User', userSchema);
module.exports = User;
