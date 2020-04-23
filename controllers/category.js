var CategorySchema = require('../models/category');
var Sub_categorySchema = require('../models/subcategory');


exports.GET_Category = (req, res, next) => {
    CategorySchema.find({},function (err, data) {
        if (err) console.log("ERROR =>",err.message);
        res.json({ page: 'GET_Category', data });
    });
};
exports.PUT_Category = (req, res, next) => {
    console.log("PUT_Category", req.body);
    const id = req.params.id;
    const Sub_categoryId = req.body.Sub_categoryId;
    Sub_categorySchema.findOne({ _id: Sub_categoryId }, function (err, data) {
        console.log("Sub_categorySchema.findOne", data);
        var Sub_categoryId = data._id;
        var Sub_category_Name = data.Name;
        var Name = req.body.name;
        CategorySchema.findOneAndUpdate(id, {
            Name,
            Sub_categoryId,
            Sub_category_Name
        }, function (err, data) {
            if (err) console.log("ERROR =>", err.message);
            res.status(200).json({ page: 'PUT_Category', data })
        });
    })
};
exports.POST_Category = (req, res, next) => {
    const Sub_categoryId = req.body.Sub_categoryId;
    Sub_categorySchema.findOne({ _id: Sub_categoryId }, function (err, data) {
        if (err) console.log("ERROR =>", err.message);
        console.log("Sub_categorySchema.findOne", data);
        var Sub_categoryId = data._id;
        var Sub_category_Name = data.Name;
        var Name = req.body.name;
        var newCategory = new CategorySchema({
            Sub_categoryId,
            Sub_category_Name,
            Name
        });
        newCategory.save((err, data) => {
            console.log("data", data);
            if (err) console.log("ERROR =>", err.message);
            res.json({ page: 'POST_Category', data });
        });
    })

};