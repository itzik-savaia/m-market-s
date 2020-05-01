var UsersSchema = require('../models/users');
var jwt = require('jsonwebtoken');
var SECRET = require('./services/secret.model');


exports.GET_UserTOKEN_ID = (req, res, next) => {
    jwt.verify(req.token, SECRET.secret, SECRET.role, (err, authdata) => {
        if (err) {
            res.status(403).json({ err: err.name });
        } else {
            try {
                const user = authdata.d
                console.log('user => ', user);
                UsersSchema.findOne({ UserName: user }, (err, data) => {
                    if (err) console.log("ERROR =>", err.message);
                    console.log("user data == >" + data);
                    if (data === null) {
                        res.status(400).json({ msg: 'user not found' })
                    } else {
                        res.status(200).send(data);
                    }
                });
            } catch (err) { console.log(err); }

        }
    })
};
exports.POST_ChackUser = (req, res, next) => {
    const chack = req.body;
    try {
        if (chack !== "") {
            if (chack.username) {
                UsersSchema.findOne({ UserName: chack.username }, (err, data) => {
                    if (err) console.log("ERROR =>", err.message);
                    console.log("data => ", data);
                    if (data !== null) {
                        if (chack.username === "admin")
                            return res.status(401).json({ msg: 'Forget about it' });

                        return res.status(401).json({ msg: `${chack.username} Already in the system` });
                    } else {
                        return res.status(200).json({ msg: 'ok' });
                    }
                })
            }
            if (chack.email) {
                UsersSchema.findOne({ Email: chack.email }, (err, data) => {
                    if (err) console.log("ERROR =>", err.message);
                    console.log("data => ", data);
                    if (data !== null) {
                        return res.status(401).json({ msg: `${chack.email} Already in the system` });
                    } else {
                        return res.status(200).json({ msg: 'ok' });
                    }
                })
            }
            if (chack.id) {
                UsersSchema.findOne({ ID_Card: chack.id }, (err, data) => {
                    if (err) console.log("ERROR =>", err.message);
                    console.log("data => ", data);
                    if (data !== null) {
                        return res.status(401).json({ msg: `${chack.id} Already in the system` });
                    } else {
                        return res.status(200).json({ msg: 'ok' });
                    }
                })
            }
        } else {
            return res.status(200).json({ msg: 'ok' });
        }
    } catch (error) {
        return res.status(401).json({ msg: 'somting is worng' });
    }
}
exports.POST_New_User = (req, res, next) => {
    console.log("POST_New_User =>", req.body.Send_2);
    const value = req.body.Send_2;
    let City = value[0];
    let Street = value[1]
    let Name = value[2]
    let LastName = value[3]
    let Email = value[4];
    let ID_Card = value[5];
    let UserName = value[6];
    let Password = value[7];
    let ConfirmPassword = value[8];
    let RoleName = "costomer";
    let costomer = [City, Street, Name, LastName, UserName, Password, ConfirmPassword, Email, ID_Card, RoleName];
    UsersSchema.findOne({ ID_Card: ID_Card }, function (err, user_ID) {
        if (err) console.log("ERROR =>", err.message);
        console.log("user_ID == " + user_ID);
        if (user_ID !== null) {
            return res.status(401).json({ msg: 'ID_Card => Already in the system' });
        } else {
            for (i = 0; i < costomer.length; i++) {
                if (costomer[i] == undefined || costomer[i] == '' || costomer[i] == null) {
                    return res.status(401).json({ msg: `${[i]} is missing!` });
                };
            };
            const chackEmail = Email.indexOf("@");
            if (chackEmail === -1) {
                return res.status(401).json({ msg: `@ is missing!` });
            } else {
                try {
                    var newUser = new UsersSchema({ City, Street, Name, LastName, UserName, Password, ConfirmPassword, Email, ID_Card, RoleName })
                    newUser.save((err, data) => {
                        if (err) console.log("ERROR =>", err.message);
                        const token = jwt.sign({
                            d: [data.UserName]
                        }, SECRET.secret, { expiresIn: 60 * 60 })
                        console.log("token =>>", token);
                        return res.status(200).json({ success: 'success', auth: true, access: token, UserName });
                    })
                } catch (err) {
                    console.log(err);
                    return res.status(400).json({ msg: "Not found", error: err });
                };
            };
        };
    });
};

// user log in 
exports.POST_User = (req, res, next) => {
    const UserName = req.body.username;
    const Password = req.body.password;
    UsersSchema.findOne({ UserName: UserName }, (err, data) => {
        if (err) console.log("ERROR =>", err.message);
        console.log("user data == >" + data);
        if (data === null) {
            res.status(400).json({ msg: 'user not found' })
        } else if (data !== null) {
            if (data.Password === Password) {
                if (data.RoleName === "admin") {
                    const admin = data.RoleName;
                    console.log("==>>hello", admin);
                    try {
                        const token = jwt.sign({
                            d: [data.UserName]
                        }, SECRET.secret, { expiresIn: '1h' })
                        console.log("token =>>", token);

                        // req.headers['toekn']
                        res.status(200).json({ auth: true, access: token, is_admin: true, UserName });
                    }
                    catch (err) {
                        res.status(400).json({ msg: "Not found catch err admin", error: err });
                        return;
                    };
                } else if (data.RoleName === "costomer") {
                    const costomer = data.RoleName;
                    console.log("==>>hello", costomer);
                    try {
                        const token = jwt.sign({
                            d: [data.UserName]
                        }, SECRET.secret, { expiresIn: '1h' })
                        console.log("token =>>", token);
                        res.status(200).json({ auth: true, access: token, UserName });
                        return;
                    }
                    catch (err) {
                        return res.status(400).json({ msg: "Not found", error: err });
                    };
                }
            } else {
                return res.status(403).send("username or password is worng try again");
            }
        } else {
            return res.status(403).send("user not found");
        }
    })
};