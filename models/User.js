const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();

const SALT_ROUNDS = process.env.SALT_ROUNDS;

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minLength: [8, 'The email should be at least 8 characters long']
    },
    username: {
        type: String,
        required: true,
        minLength: [4, 'The username should be at least 4 characters long']

    },
    password: {
        type: String,
        required: true,
        minLength: [4, 'The password should be at least 4 characters long']
    },
    excursions: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Excursion'
        }
    ],
    bookedExcursions: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Excursion'
        }
    ],
    comments: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Comment'
        }
    ]

});

userSchema.pre('save', function (next) {
    bcrypt.hash(this.password, SALT_ROUNDS)
        .then(hashedPassword => {
            this.password = hashedPassword;
            next();
        });
});

const User = mongoose.model('User', userSchema);

module.exports = User;