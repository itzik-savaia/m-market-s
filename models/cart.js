var mongoose = require('mongoose');

// Define schema
var Schema = mongoose.Schema;

var CartSchema = new Schema({
    /*(PK) Auto ID*/
    /*(FK)*/UserId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}, //user from users Schema
    CartDate: {type: Date, default: Date.now}, //cart date
});

// Compile model from schema
module.exports = mongoose.model('cart', CartSchema );