const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const permissionsSchema = new Schema({
  permission: [String]
});

const PermissionsModel = mongoose.model('PermissionsModel', permissionsSchema);
module.exports = PermissionsModel;

export {};
