# NodeJS Example InstaApp

This is an example API built on NodeJS that handles posts in a social network. This is based on [Rocketset's](https://rocketseat.com.br/starter) free courses.

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

`GET` on `/posts/:id` where `:id` is a post id gets the post with the id.
```
{
  "numberOfPosts": 1,
  "post": [
    {
      "likes": 72,
      "_id": "5d04493d51cc980017ede7a9",
      "author": "Bruno Drugowick",
      "place": "Campinas, SP",
      "description": "This is an Instagram clone that runs a NodeJS backend using a MongoDB Atlas (cloud) instance and a React frontend. You can upload a new picture using the camera icon (top right corner) and see the feed (app logo on top left corner).",
      "hashtags": "#demo #node #express #mongoDBAtlas #react #stringsEverywhere",
      "s3Url": "https://omnistack-quick-start-bucket.s3.amazonaws.com/15.jpeg",
      "createdAt": "3019-06-15T01:26:21.695Z",
      "updatedAt": "2019-06-21T04:11:09.990Z",
      "__v": 0
    }
  ]
}
```

`POST` on `/posts/:id/like` where `:id` is a post id adds a like to that particular post. No request body is necessary.

`GET` on `/posts/:id/comments` where `id` is a post id gets its comments.
```
{
  "numberOfComments": 1,
  "comments": [
    {
      "_id": "5d0d78e6fa06b600175f0948",
      "author": "Bruno Drugowick",
      "comment": "You can also comment!",
      "post": "5d04493d51cc980017ede7a9",
      "createdAt": "2019-06-22T00:40:06.856Z",
      "updatedAt": "2019-06-22T00:40:06.856Z",
      "__v": 0
    }
  ]
}
```

`POST` on `/posts/:id/comment` where `id` is a post id posts a comment to the post with the id. Request should be url-encoded with the parameters:

- author (string)
- comment (string)
- post (the id of the post - string)

## Images

Images are saved on a Amazon S3 instance.

## Running

Clone this repository, install and start the application backend (this API) in dev mode with 
```
cd backend
yarn && yarn dev
```
This uses nodemon (a dev dependency) to monitor the app files and automatically restarts the app when you make modifications.

The application uses a MongoDB instance at [https://cloud.mongodb.com](https://cloud.mongodb.com). You may use mine since it allows connections from anywhere, although you should change it to your own database at `index.js` file.

## Production

This application runs at [https://omnistack-quick-start-backend.herokuapp.com/](https://omnistack-quick-start-backend.herokuapp.com/).

The *frontend* this application supports runs at [https://omnistack-quick-start-frontend.herokuapp.com/](https://omnistack-quick-start-frontend.herokuapp.com/).
