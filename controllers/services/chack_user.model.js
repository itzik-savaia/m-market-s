var UsersSchema = require('../../models/users');

exports.Chack_Email = (req, res, next) => {
    const Email = req.body.Send_2[4];
    console.log(Email);

    //check email
    UsersSchema.findOne({ Email: Email }, function (err, data) {
        if (data !== null) {
            if (data.Email !== null) {
                console.log('Already in the system => Email=>', data.Email);
                return res.send('This email Already in the system');
            }
        }
        next()
    })
};
exports.Chack_UserName = (req, res, next) => {
    const UserName = req.body.Send_2[6];
    console.log(UserName);

    //chack username
    UsersSchema.findOne({ UserName: UserName }, function (err, data) {
        if (data !== null) {
            if (data.UserName !== null) {
                console.log("Already in the system => username == " + data.UserName);
                return res.send('This username Already in the system');
            }
        }
        next()
    })
};
exports.Chack_ID_Card = (req, res, next) => {
    const ID_Card = req.body.Send_2[5]
    // //chack ID
    UsersSchema.findOne({ ID_Card: ID_Card }, function (err, data) {
        if (data !== null) {
            if (data.ID_Card !== null) {
                console.log("Already in the system => ID_Card == " + data.ID_Card);
                return res.send('This ID Already in the system');
            }
        }
        next()
    })
};
