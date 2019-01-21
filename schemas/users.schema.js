const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: String,
  login: String,
  roles: [String],
  isActive: String,
  creationDate: Number
});

const UserModel = mongoose.model('UserModel', userSchema);
module.exports = {UserModel};

