var RolesSchema = require('../models/roles');


exports.GET_Role = (req, res, next) => {
    RolesSchema.find({},function (err, data) {
        if (err) console.log("ERROR =>",err.message);
        res.json({ page: 'GET_Role', data });
    });
};
exports.PUT_Role = (req, res, next) => {
    //צריך לבדוק
    console.log("PUT_Role", req.body);
    console.log(req.params);
    const id = req.params.id;
    const Name = req.body.name;
    RolesSchema.findOneAndUpdate(id,{Name},function(err){
        if (err) console.log("ERROR =>",err.message);
        res.json({ page: 'PUT_Role' });
   });
};
exports.POST_Role = (req, res, next) => {
    console.log("POST_Role", req.body);
    const Name = req.body.name;
    var newRole = new RolesSchema({ Name });
    newRole.save((err, data) => {
        console.log(data);
        if (err) console.log("ERROR =>",err.message);
        res.json({ page: 'POST_Role', data });
    });  
};