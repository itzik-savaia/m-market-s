exports.verifyToken = (req, res, next) => {
    //authorization: bearer <access_token>
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken
        next();
    } else {
        return res.sendStatus(403)
    }
}