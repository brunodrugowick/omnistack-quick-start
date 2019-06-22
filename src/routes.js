const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const PostController = require('./controllers/PostController');
const LikeController = require('./controllers/LikeController');
const CommentsController = require('./controllers/CommentsController');

const routes = new express.Router();
const upload = multer(uploadConfig);

routes.get('/posts', PostController.index);
routes.post('/posts', upload.single('image'), PostController.store);
routes.get('/posts/:id', PostController.getById);

routes.post('/posts/:id/like', LikeController.store);

routes.get('/posts/:id/comments', CommentsController.index);
routes.post('/posts/:id/comment', CommentsController.store);

module.exports = routes;