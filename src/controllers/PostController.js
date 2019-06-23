const Post = require('../models/Post');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const aws = require('aws-sdk');

aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: process.env.AWS_DEFAULT_REGION,
    httpOptions: {
        xhrAsync: false,
    }
});

const s3 = new aws.S3();

module.exports = {
    async index(req, res) {
        const posts = await Post.find().sort('-createdAt');

        return res.json({numberOfPosts: posts.length, posts});
    },
    async getById(req, res) {
        const post = await Post.find({ _id: req.params.id });

        return res.json({numberOfPosts: post.length, post});
    },
    async store(req, res) {
        const { author, place, description, hashtags } = req.body;
        const { filename: imageFileName } = req.file;

        const [fileName, fileExt] = imageFileName.split('.');
        const newFileName = `${fileName}.jpg`;

        // Generate resized image
        const resizedImagePath = path.resolve(req.file.destination, 'resized', newFileName);
        await sharp(req.file.path)
            .resize(500)
            .jpeg({ quality: 70})
            .toFile(resizedImagePath);
        
        const s3Url = `http://${process.env.S3_BUCKET}.s3-website-${process.env.AWS_DEFAULT_REGION}.amazonaws.com/${newFileName}`;

        const fileBinaryString = fs.readFileSync(resizedImagePath, null);
        const s3Params = {
            Body: fileBinaryString,
            Bucket: process.env.S3_BUCKET,
            Key: newFileName,
        }

        // Save to Amazon S3
        await s3.putObject(s3Params, (error, data) => {
            if (error) {
                console.error(error);
                console.error("Error uploading to S3.")
                return res.status(500).send("An error happened (s3 upload error).");
            } else {
                data.url = s3Url;
                console.log(data);
            }
        });
       
        const post = new Post;
        post.author = author;
        post.place = place;
        post.description = description;
        post.hashtags = hashtags;
        post.s3Url = s3Url,
        // Save post to MongoDB
        await post.save();

        // Remove original and resized images
        fs.unlinkSync(req.file.path);
        fs.unlinkSync(resizedImagePath);

        // Emit new post to connected clients via WebSocket.
        req.io.emit('post', post);

        return res.json(post);
    }
};
