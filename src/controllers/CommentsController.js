const Comment = require('../models/Comment');
const Post = require('../models/Post');

module.exports = {
    async index(req, res) {
        const comments = await Comment.find({ post: req.params.id}).sort('createdAt');
        return res.json({numberOfComments: comments.length, comments});
    },
    async store(req, res) {
        const { author, comment, post } = req.body;

        // Post comment
        const commentDb = new Comment;
        commentDb.author = author;
        commentDb.comment = comment;
        commentDb.post = post;

        await commentDb.save();

        req.io.emit('comment', commentDb);

        return res.json(commentDb);
    }
};