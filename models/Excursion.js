const mongoose = require('mongoose');

const excursionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'The Title is required'],
        minLength: [5, 'The Title should be at least 5 characters']
    },

    duration: {
        type: String,
        required: [true, 'The Duration is required'],
        minLength: [3, 'The Duration should be a minimum of 3 characters long']
    },
    
    destination: {
        type: String,
        required: [true, 'The Destination is required'],
        minLength: [3, 'The Destination should be at least 3 characters']
    },
    
    price: {
        type: Number,
        required: [true, 'The Price is required'],
        min: [0, 'The Price should be a positive number'],
    },

    description: {
        type: String,
        required: [true, 'The Description is required'],
        min: [4, 'The Description should be a minimum of 4 characters long and maximum of 100 characters long'],
        max: [100, 'The Description should be a minimum of 4 characters long and maximum of 100 characters long']
    },

    image: {
        type: String,
        required: [true, 'The Image is required'],
        // validate: {
        //     validator: function () {
        //         return this.image.startsWith('http');
        //     },
        //     message: 'The Image should starts with http:// or https://'
        // }
    },

    listOfUsersBooked: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ],

    creatorName: {
        type: String,
        // required: true
    },

    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },

    comments: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Comment'
        }
    ]
});

const Excursion = mongoose.model('Excursion', excursionSchema);

module.exports = Excursion; 