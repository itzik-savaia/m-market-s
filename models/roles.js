var mongoose = require('mongoose');

// Define schema
var Schema = mongoose.Schema;

var RolesSchema = new Schema({
    /*(PK) Auto ID*/
    Name: String, //role name
});

// Compile model from schema
module.exports = mongoose.model('role', RolesSchema );