var mongoose = require('mongoose');

// Define schema
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    /*(PK) Auto ID*/
    Name: String, //name of product
    Price: Number, //price of product
    CategoryId: Object,
    CategoryName:String,
    Sub_categoryId:Object,
    Sub_category_Name:String,
    ImageName: String,//image of product
    ImagePath: String,//image of product
});

// Compile model from schema
module.exports = mongoose.model('product', ProductSchema );