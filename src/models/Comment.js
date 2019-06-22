const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    post: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Comment', CommentSchema);
