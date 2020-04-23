var ItemSchema = require('../models/item');
var CartSchema = require('../models/cart');

exports.GET_Item = (req, res, next) => {
    console.log("POST_Item =>", req.body);
    ItemSchema.find({}, function (err, data) {
        if (err) throw err
        res.send(data);
    });
};
exports.POST_Item = (req, res, next) => {
    // console.log("%%=POST_Item=%% =>=>", req.body);
    const UserId = req.body.USERNAME._id;
    const ProductID = req.body.find.ProductID;
    const Quantity = req.body.find.Quantity;
    const Price = req.body.find.Price;
    const Name = req.body.find.Name;
    const Img = req.body.find.Img;
    try {
        if (Quantity === 0) {
            console.log(req.body);
            ItemSchema.find({}, (err, data) => {
                if (err) throw err
                if (data.Quantity === 0) {
                    ItemSchema.findOneAndDelete(data.Quantity).exec((err) => {
                        if (err) throw err
                    })
                }
            });
        }
        CartSchema.find({ UserId: UserId })
            .populate('UserId')
            .exec((err, data) => {
                if (err) throw err
                const CartID = data[0].id
                ItemSchema.findOneAndUpdate(
            /*were to update*/ { ProductID },
                    /*waht to update*/{ Quantity }
                ).populate('ProductID').exec((err, data) => {
                    if (err) throw err
                    try {
                        ItemSchema.find({}, (err, data) => {
                            if (err) throw err
                            if (data.Quantity === 0) {
                                ItemSchema.findOneAndDelete(data.Quantity).exec((err) => {
                                    if (err) throw err
                                })
                            }
                        });
                        if (data === null) {
                            const Item = new ItemSchema({
                                Name,
                                Img,
                                Price,
                                Quantity,
                                CartID,
                                ProductID,
                            });
                            Item.save((err, data) => {
                                if (err) throw err
                                res.status(200).send(data);
                            });
                        } else if (data !== null) {
                            res.status(200).send(data);
                        } if (Quantity === 0) {
                            ItemSchema.findOneAndDelete(
                        /*ware to update*/ProductID).exec((err) => {
                                if (err) throw err
                            });
                        }
                    } catch (err) { console.log(err) }
                });
            });
    } catch (err) { console.log(err); }
};

