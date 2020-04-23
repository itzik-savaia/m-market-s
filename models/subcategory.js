var mongoose = require('mongoose');

// Define schema
var Schema = mongoose.Schema;

var Sub_categorySchema = new Schema({
    /*(PK) Auto ID*/
    Name: String //sub_category name 
});

// Compile model from schema
module.exports = mongoose.model('sub_category', Sub_categorySchema );