const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const SECRET = process.env.SECRET;

exports.create = ({ email, username, password }) => User.create({ email, username, password });

// exports.createToken = (user) => {
//     const options = { expiresIn: '1d' };
//     const payload = { _id: user._id, username: user.username };

//     const promise = new Promise((resolve, reject) => {
//         jwt.sign(payload, SECRET, options, (err, decodedToken) => {
//             if (err) {
//                 return reject(err);
//             }
//             resolve(decodedToken);
//         });
//     });
//     return promise;
// }

exports.createToken = (user) => {
    const options = { expiresIn: '1d' };
    const payload = { _id: user._id, username: user.username };

    const promise = new Promise((resolve, reject) => {
        jwt.sign(payload, SECRET, options, (err, decodedToken) => {
            if(err) {
                return reject(err);
            }
            resolve(decodedToken);
        });
    });
    return promise;

}

exports.login = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw { message: 'Cannot find such email or password' }
    }

    const isValid = bcrypt.compare(password, user.password);

    if (!isValid) {
        throw { message: 'Wrong email or password' }
    }

    return user;
}







