const express = require('express')
const UserRoute = express.Router()
const User = require('./user.model')

// varify refresh token middleware (which will be verifying the section)
let verifySession = (req, res, next) => {
    let refreshToken = req.header('refresh-token')
    let _id = req.header('_id')

    User.findByIdAndToken(_id, refreshToken).then((user) => {
        if (!user) {
            return Promise.reject({
                'error': 'User not found . Make sure that refresh token and user id'
            })
        }
        req.user_id = user._id;
        req.userObject = user;
        req.refreshToken = refreshToken;

        let isSessionValid = false

        user.sessions.forEach((session) => {
            if (session.token === refreshToken) {
                if (User.hasRefreshTokenExpired(session.expiresAt === false)) {
                    isSessionValid = true;
                }
            }
        })

        if (isSessionValid) {
            next()
        } else {
            return Promise.reject({
                'error': 'Refresh token has expired or the session is invalid'
            })
        }
    }).catch((e) => {
        res.status(401).send(e)
    })
}

UserRoute.post('/create', (req, res) => {
    let body = req.body;
    let user = new User(body);

    user.save().then(() => {
        return user.createSession();
    }).then((refreshToken) => {
        return user.generateAccessAuthToken().then((accessToken) => {
            return { accessToken, refreshToken }
        });
    }).then((authTokens) => {
        let obj = {
            user,
            authTokens
        }
        res
            .header('refresh-token', authTokens.refreshToken)
            .header('access-token', authTokens.accessToken)
            .send({ success: true, message: 'User Registration Successfull', data: obj });
    }).catch((e) => {
        res.status(400).send({ success: false, message: "User Registration Failed!!" });
    })
})


UserRoute.post('/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    User.findByCredentials(email, password).then((user) => {
        return user.createSession().then((refreshToken) => {
            return user.generateAccessAuthToken().then((accessToken) => {
                return { accessToken, refreshToken }
            });
        }).then((authTokens) => {

            let obj = {
                user,
                authTokens
            }
            res
                .header('refresh-token', authTokens.refreshToken)
                .header('access-token', authTokens.accessToken)
                .send({ success: true, message: 'User Login Successfull', data: obj });
        })
    }).catch((e) => {
        res.status(400).send({ success: false, message: 'User Login Failed!!' });
    });
})


UserRoute.get('/me/access-token', verifySession, (req, res) => {
    req.userObject.generateAccessAuthToken().then((accessToken) => {
        res.header('access-token', accessToken).send({ success: true, message: 'Access Token Genareted', accessToken })
    }).catch((e) => {
        res.status(400).send({ success: false, message: "Access Token Genaration Failed!!" });
    })
})

module.exports = UserRoute
