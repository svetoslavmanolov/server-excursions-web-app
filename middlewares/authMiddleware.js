const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const SECRET = process.env.SECRET;

exports.auth = (req, res, next) => {
    const token = req.cookies.token;

    if (token) {
        jwt.verify(token, SECRET, ((err, decodedToken) => {
            if (err) {
                res.clearCookie('token');
                return res.status(401);
            }
            req.user = decodedToken;
            res.locals.user = decodedToken;
            next();
        }));
    } else {
        next();
    }
}

exports.isAuth = (req, res, next) => {
    if (!req.user) {
        return res.status(401);
    }
    next();
}

exports.isGuest = (req, res, next) => {
    if (req.user) {
        return res.status(401);
    }
    next()
}