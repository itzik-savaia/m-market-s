var mongoose = require('mongoose');

// Define schema
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
    /*(PK) Auto ID*/
    Name: String, //category name 
    /*(FK)*/Sub_categoryId: {type: mongoose.Schema.Types.ObjectId, ref: 'sub_category'}, //subcategory from subcategory Schema
    Sub_category_Name:String
});

// Compile model from schema
module.exports = mongoose.model('category', CategorySchema );