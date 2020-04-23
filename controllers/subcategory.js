var Sub_categorySchema = require('../models/subcategory');
 

exports.GET_SUB_Category = (req, res, next) => {
    Sub_categorySchema.find({},function (err, data) {
        if (err) console.log("ERROR =>",err.message);
        res.json({ page: 'GET_SUB_Category', data });
    });
};
exports.PUT_SUB_Category = (req, res, next) => {
    console.log("PUT_SUB_Category", req.body);
    console.log(req.params);
    const id = req.params.id;  
    const Name = req.body.name;
    Sub_categorySchema.findOneAndUpdate(id,{Name},function(err){
        if (err) console.log("ERROR =>",err.message);
        res.json({ page: 'PUT_SUB_Category' });
   });
};
exports.POST_SUB_Category = (req, res, next) => {
    const Name = req.body.name;
    var newSUB_Category = new Sub_categorySchema({ Name });
    newSUB_Category.save((err, data) => {
        if (err) console.log("ERROR =>",err.message);
        res.json({ page: 'POST_SUB_Category', data });
    });  
};