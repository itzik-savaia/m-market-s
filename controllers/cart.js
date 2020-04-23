var CartSchema = require('../models/cart');
var ItemSchema = require('../models/item');



exports.GET_Cart = (req, res, next) => {
    // console.log("GET_Cart =>", req.params);
    const id = req.params.id;
    CartSchema.findOne({ UserId: id })
        .populate('UserId')
        .exec((err, data) => {
            // console.log(data);
            if (err) console.log("ERROR =>", err.message);
            res.json({ page: 'GET_Cart', data });
        });
};
exports.PUT_Cart = (req, res, next) => {
    console.log("PUT_Cart");

};
exports.POST_Cart = (req, res, next) => {
    console.log("%POST_Cart%=>", req.body);
    const UserId = req.body.USERNAME._id;
    CartSchema.findOne({ UserId: UserId }).populate('UserId').exec((err, data) => {
        if (err) console.log("ERROR =>", err.message);
        if (data === null) {
            console.log("**opne new Cart**");
            const UserId = req.body.USERNAME._id;
            const CartDate = req.body.cart_date;
            var newCrt = new CartSchema({
                UserId,
                CartDate,
            });
            ItemSchema.find({}, (err, data) => {
                if (err) throw err
                if (data.Quantity === 0) {
                    ItemSchema.findOneAndDelete(data.Quantity).exec((err) => {
                        if (err) throw err
                    })
                }
            });
            newCrt.save((err) => {
                if (err) console.log("ERROR =>", err.message);
            });
        }
        else {
            console.log("cart = NEXT => ");
            next()
        };
    });

};


// var aaray = [
//     '["123123","123","123355"]',
//     '["23", "54","23"]'
// ]
// console.log(aaray);
// var aaa = aaray[0].match(/\d+/g).map(Number)
// console.log(aaa);
