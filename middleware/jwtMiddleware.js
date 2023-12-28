const jwt = require("jsonwebtoken");
require('dotenv').config()

const authenticateToken = function (req, res, next) { //https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[0];
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
        //console.log(err)
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    })
}

module.exports = authenticateToken;