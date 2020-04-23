var mongoose = require('mongoose');

// Define schema
var Schema = mongoose.Schema;

var UsersSchema = new Schema({
    /*(PK) Auto ID*/
    UserName: String, //username of user
    Password: String, //password of user
    Name: String, //name of user
    LastName: String, //lastname of user 
    Email: String, //email of user
    City: String, //city of user live
    Street: String, //street of user live
    ID_Card: Number,
    /*(FK)*/RoleName: {type: mongoose.Schema.Types.String, ref: 'role'} //role from roles Schema
});

// Compile model from schema
module.exports = mongoose.model('User', UsersSchema );