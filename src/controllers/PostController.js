const Post = require('../models/Post');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

module.exports = {
    async index(req, res) {
        const posts = await Post.find().sort('-createdAt');

        return res.json({numberOfPosts: posts.length, posts});
    },
    async store(req, res) {
        const { author, place, description, hashtags } = req.body;
        const { filename: image } = req.file;

        const [name, ext] = image.split('.');
        const fileName = `${name}.jpg`;

        // Generate resized image
        await sharp(req.file.path)
        .resize(500)
        .jpeg({ quality: 70})
        .toFile(
            path.resolve(req.file.destination, 'resized', fileName)
        )

        // Remove original image
        fs.unlinkSync(req.file.path);
        
        const post = await Post.create({	
            author,	
            place,	
            description, 	
            hashtags, 	
            image: fileName,
        });

        // Emit new post to connected clients via WebSocket.
        req.io.emit('post', post);

        return res.json(post);
    }
};