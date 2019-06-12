# NodeJS Example InstaApp

This is an example API built on NodeJS that handles posts in a social network. This is based on [Rocketset's](https://rocketseat.com.br/starter) free coursers.

## Endpoints

`GET` on `/posts` gets all the posts. Example response:
```
{
  "numberOfPosts": 2,
  "posts": [
    {
      "likes": 0,
      "_id": "5d00738694107128d75309ee",
      "author": "Bruno Drugo",
      "place": "Campinas",
      "description": "Um post do Drugo.",
      "hashtags": "#demo #node #express #mongoDBAtlas",
      "image": "Screenshot from 2019-05-05 17-26-18.jpg",
      "createdAt": "2019-06-12T03:37:42.655Z",
      "updatedAt": "2019-06-12T03:37:42.655Z",
      "__v": 0
    },
    {
      "likes": 3,
      "_id": "5d007046a7284b26fb6315f6",
      "author": "Bruno Drugo",
      "place": "Campinas",
      "description": "Um post do Drugo.",
      "hashtags": "#demo #node #express #mongoDBAtlas",
      "image": "Screenshot from 2019-05-05 17-26-18.jpg",
      "createdAt": "2019-06-12T03:23:50.760Z",
      "updatedAt": "2019-06-12T03:23:50.760Z",
      "__v": 0
    }
  ]
}
```

`POST` on `/posts` with a header `Content-type` of `multipart/form-data` posts a post (hahaha). Request body should contain:
```
image: a file.
author: the author.
place: a description of a place.
description: a description for the post.
hashtags: a string with any number of hashtags separated by a single space (actually, just a string :).
```

`POST` on `/posts/:id/like` where `:id` is a post id adds a like to that particular post. No request body is necessary.

## Running

Clone this repository and start the application with 
```
yarn dev
```
This uses nodemon (a dev dependency) to monitor the app files and automatically restarts the app when you make modifications.

The application uses a MongoDB instance at [https://cloud.mongodb.com](https://cloud.mongodb.com). You may use mine since it allows connections from anywhere, although you should change it to your own database at `index.js` file.

## Production

I don't know that yet.