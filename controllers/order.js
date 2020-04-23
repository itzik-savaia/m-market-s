var OrederSchema = require('../models/order');
var CartSchema = require('../models/cart');
var ItemSchema = require('../models/item');
var UsersSchema = require('../models/users');
const fs = require('fs');
const PDF = require('pdfkit');

exports.GET_Order = (req, res, next) => {
    console.log("GET_Order =>");
    OrederSchema.find({})
        .populate('CartId')
        .exec((err, data) => {
            if (err) console.log("ERROR =>", err.message);
            let quantity = data.length
            res.json({ page: 'GET_Order', data, Quantity_Of_Orders: quantity });
        });

};
exports.POST_Order = (req, res, next) => {
    var user = req.body[1]
    var body = req.body[0]
    var CartId = body[0].ID_Card;
    var FinalPrice = body[0].final_price;
    var City = body[0].city;
    var Street = body[0].street;
    var order = body[0].order;
    var Delivery_Date = body[0].delivery_date;
    var Order_Date = new Date();
    var CreditCard = body[0].CreditCard
    var Last4Digits = CreditCard.slice(8, 12);
    var empty = [City, Street, Delivery_Date, CreditCard];
    for (let i = 0; i < empty.length; i++) {
        if (empty[i] === undefined) {
            return res.status(401).json({ msg: "somting is missing" });
        }
    }
    try {
        CartSchema.findOne(CartId, (err, data) => {
            if (err) console.log("ERROR =>", err.message);
            OrederSchema.find({}, (err, data) => {
                if (err) console.log("ERROR =>", err.message);
                // data.forEach(e => {
                //     var datefull = Order_Date.getFullYear() + "/" + (Order_Date.getMonth() + 1) + "/" + Order_Date.getDate();
                //     var orderdate = e.Order_Date.getFullYear() + "/" + (e.Order_Date.getMonth() + 1) + "/" + e.Order_Date.getDate()
                // })
                let doc = new PDF();
                doc.pipe(fs.createWriteStream(`${__dirname}/../uploads/orders/${user.Email}.pdf`));
                doc.text(`Name:     Price:  Quantity:`)
                doc.moveDown()
                order.forEach(e => { doc.text(`${e.Name}     ${'$' + e.Price}        ${e.Quantity}\n`) });
                doc.text(`
                            Name: ${user.Name}
                            City: ${user.City}
                            Street: ${user.Street}\n
                            FinalPrice: ${'$' + FinalPrice}
                            Delivery-Date: ${Delivery_Date}
                            Order-Date: ${Order_Date}\n
                            contect us 123@gmail.com
                            Thank you from M-MARKET`)
                doc.end();
                var newOrder = new OrederSchema({
                    CartId,
                    FinalPrice,
                    City,
                    Street,
                    Last4Digits,
                    Delivery_Date,
                    Order_Date
                });
                newOrder.save((err, data) => {
                    if (err) console.log("ERROR =>", err.message);
                    res.json({ page: 'POST_Order =>', data })
                    ItemSchema.deleteMany({}, (err) => {
                        if (err) console.log("ERROR =>", err.message);
                        CartSchema.findOneAndDelete(CartId, (err) => {
                            if (err) console.log("ERROR =>", err.message);
                        })
                    })
                })

            });
        });
    } catch (err) { console.log(err) }
};