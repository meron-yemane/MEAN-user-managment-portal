const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rolesSchema = new Schema({
  name: String,
  permissions: [String],
  isActive: String
});

const RolesModel = mongoose.model('RolesModel', rolesSchema);
module.exports = RolesModel;

export {};
