const User = require('../module/user/user.model')
const jwt = require('jsonwebtoken')

// check whether the request has valid jwt access token
let Authenticate = (req, res, next) => {
    let token = req.header('access-token');

    // varify the jwt 
    jwt.verify(token, User.getJWTSecret(), (err, decoded) => {
        if (err) {
            // ther was an error
            // jwt is invalid 
            res.status(401).send(err)
        } else {
            const user = User.findOne({ _id: decoded._id, 'sessions.token': token })
            req.user = user;
            req.user._id = decoded._id;
            next()
        }
    })
}

module.exports = Authenticate