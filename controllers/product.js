var ProductSchema = require('../models/product');

//Models
const fs = require('fs');


exports.GET_Product = (req, res, next) => {
    ProductSchema.find({}, function (err, data) {
        if (err) console.log("ERROR =>", err.message);
        let quantity = data.length
        res.json({ page: 'GET_Product', data, Quantity_Of_Products: quantity });
    });
};
exports.GET_CategoryID = (req, res, next) => {
    console.log("GET_CategoryID =>", req.params);
    const id = req.params.id;
    ProductSchema.findOne({ _id: id })
        .populate('CategoryId')
        .exec(function (err, data) {
            console.log("data");
            if (err) console.log("ERROR =>", err.message);
            res.json({ page: 'GET_CategoryID', data });
        });
};
exports.GET_CategoryName = (req, res, next) => {
    console.log("GET_CategoryName =>", req.params);
    const Name = req.params.name;
    ProductSchema.findOne({ Name: Name })
        .populate('CategoryId')
        .exec(function (err, data) {
            if (err) console.log("ERROR =>", err.message);
            res.json({ page: 'GET_CategoryName', data });
        });
};
exports.POST_Product = (req, res, next) => {
    var file = req.files.image;
    try {
        if (!file) {
            return res.status(400).json({ msg: 'No file uploaded' });
        };
        file.mv(`${__dirname}/../uploads/${file.name}`, err => {
            if (err) return res.status(400).json({ Error: "Error ->", err })
            else {
                const fileName = file.name;
                const body = req.body;
                const Category = JSON.parse(req.body.CategoryId);
                const filePath = `/uploads/images/${Category.Sub_category_Name}/${Category.CategoryName}/${file.name}`;
                const Product = new ProductSchema({
                    Name: body.Name,
                    Price: body.Price,
                    CategoryId: Category._id,
                    CategoryName: Category.Name,
                    Sub_categoryId: Category.Sub_categoryId,
                    Sub_category_Name: Category.Sub_category_Name,
                    ImageName: fileName,
                    ImagePath: filePath,
                })
                Product.save((err, data) => {
                    if (err) console.log("ERROR =>", err.message);
                    res.status(200).json({
                        msg: "File uploaded",
                        data: data
                    });
                });
            };
        });
    } catch (err) { console.log(err) }

};
exports.PUT_Product = (req, res, next) => {
    try {
        const id = req.params.id;
        const Name = req.body.Name
        const Price = req.body.Price
        const CategoryId = req.body.CategoryId
        var file = req.files.image;
        const fileName = file.name;
        const filePath = `/uploads/${file.name}`;
        const body = req.body;
        for (let i = 0; i < body.length; i++) {
            if (body[i] === undefined) return res.status(401).json({ msg: "somting is missing" });
        }
        try {
            ProductSchema.findOne({ _id: id }, (err, data) => {
                if (err) console.log("ERROR =>", err.message);
                console.log("findOne data =>", data);
                fs.unlink(`${__dirname}../..${data.ImageName}`, (err) => {
                    if (err) console.log("ERROR =>", err.message);
                    console.log(`successfully deleted ${data.ImageName}`);
                });
            })
            // file.mv(`${__dirname}/../uploads/${file.name}`, err => {
            //     if (err) return res.status(400).json({ Error: "Error ->", err })
            //     else {
            //         ProductSchema.findOneAndUpdate(
            // /*ware to update*/{ _id: id }, //if id is not the name on data base so the id is _id if else is = "";
            // /*waht to update*/{ Name, Price, CategoryId, ImageName: fileName, ImagePath: filePath })
            //             .populate('ProductID')
            //             .exec((err, data) => {
            //                 if (err) throw err
            //                 console.log("data", data);
            //                 res.status(200).json({ msg: "File uploaded" })
            //             });
            //     }
            // })
        } catch (error) { res.status(401).send(error); }
    } catch (error) {
        res.status(401).send(error);
    }

};

