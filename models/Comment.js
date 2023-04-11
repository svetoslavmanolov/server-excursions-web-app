const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        trim: true,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    },

    creator: {
        type: String,
        required: true
    },

    creatorId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },

    excursion: {
        type: mongoose.Types.ObjectId,
        ref: 'Excursion'
    }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;