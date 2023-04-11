const jwt = require('jsonwebtoken');
// const { COOKIE_SESSION_NAME } = require('../constants');
const { SECRET } = require('../config/env');

exports.auth = (req, res, next) => {
    const token = req.cookies.token;
    // console.log(token)

    if (token) {
        jwt.verify(token, SECRET, ((err, decodedToken) => {
            if(err) {
                res.clearCookie('token');
                return res.status(401);
            }
            req.user = decodedToken;
            res.locals.user = decodedToken;
            next();
        }));



        // const decodedToken = jwt.verify(token, SECRET)
        // req.user = decodedToken;
        // console.log(decodedToken)
        // res.locals.user = decodedToken;
        // next();
    } else {
        next();
    }

    // try {
    //     const decodedToken = jwt.verify(token, SECRET)
    //     req.user = decodedToken;
    //     console.log(decodedToken)
    //     res.locals.user = decodedToken;
    //     next();
    // } catch (error) {
    //     res.clearCookie('token');
    //     return res.status(401);
    // }
}


    exports.isAuth = (req, res, next) => {
        if(!req.user) {
            return res.status(401);
        }
        
        next();
    }

    // exports.isGuest = (req, res, next) => {
    //     if(req.user) {
    //         return res.redirect('/');
    //     }
    //     next();
    // }

    exports.isGuest = (req, res, next) => {
        if(req.user) {
            
            return res.status(401);
        }
        next()
    }




    // if (token) {
    //     jwt.verify(token, SECRET, ((err, decodedToken) => {
    //         if (err) {
    //             // res.clearCookie('user');
    //             // res.cookie(COOKIE_SESSION_NAME, token, { maxAge: 100 });
    //             console.log('Unauthorized access')
    //             // return res.redirect('/auth/login');
    //             res.status(401);
    //             return;
    //         }