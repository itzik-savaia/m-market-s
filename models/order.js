var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrederSchema = new Schema({
    CartId: Object,
    FinalPrice: Number, //final price of order
    City: String, //city order
    Street: String, //street order
    Delivery_Date: Date,// תאריך משלוח
    Order_Date: { type: Date, default: Date.now }, //order date //ביצוע הזמנה
    Last4Digits: Number, //last 4 digits of cart -> user 
});
module.exports = mongoose.model('order', OrederSchema);