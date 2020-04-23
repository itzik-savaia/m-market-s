var mongoose = require('mongoose');

// Define schema
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
    /*(PK) Auto ID*/
    /*(FK)*/CartID: {type: mongoose.Schema.Types.ObjectId, ref: 'cart'}, //cart from cart Schema
    /*(FK)*/ProductID: {type: mongoose.Schema.Types.ObjectId, ref: 'product'}, //product from product Schema
    Quantity: Number, //quantity of item
    Price: Number, //price of item
    Name:String,
    Img:String
});

// Compile model from schema
module.exports = mongoose.model('item', ItemSchema );