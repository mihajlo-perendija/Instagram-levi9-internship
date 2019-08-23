const { ObjectID } = require('mongodb');
const _ = require('lodash');
const fs = require('fs');
const path = require('path')

const { User } = require('../models/user');
const { Post } = require('../models/post');


// single post page: image and text, with list of comments
// Get post
// in: post id
// out: post
function singlePost(req, res) {
    var postId = req.params.postId;

    if (!ObjectID.isValid(postId)) {
        return res.status(404).send({ text: 'Invalid post id' });
    }

    Post.findById(postId).then((post) => {
        if (!post) {
            return res.status(404).send({ text: 'Non existing post id' });
        }
        res.status(200).send({ post });
    }).catch((e) => res.status(400).send());
}

// new post (from new post page)
// in: logged in user id
// out: created post
function newPost(req, res) {
    var loggedInUser = req.user;
    var postBody = _.pick(req.body.post, ['imageUrl', 'description']);

    postBody.owner = loggedInUser._id.valueOf();
    var newPost = new Post(postBody);

    newPost.save().then((post) => {
        res.send({ post });
    }, (e) => {
        res.status(400).send(e);
    }).catch((e) => res.status(400).send(e));
}

// new comment on post (from single post page)
// in: post id, logged in user id
// out: updated post 
function comment(req, res) {
    var loggedInUser = req.user;
    var postId = req.params.postId;

    if (!ObjectID.isValid(postId)) {
        return res.status(404).send({ text: 'Invalid post id' });
    }

    var comment = new Object();
    comment.text = req.body.text;
    comment.author = loggedInUser._id;
    comment._id = new ObjectID();
    comment.createdAt = new Date().getTime();

    Post.findByIdAndUpdate(postId, { $push: { comments: comment } }, { new: true }).then((post) => {
        res.send({ post });
    }).catch((e) => res.status(400).send(e));;
}

// home page: list of posts from users that are followed, ordered by most recent
// in: id of logged in user
// out: all posts of followed users
function homePosts(req, res) {
    var loggedInUser = req.user;

    Post.find({
        owner: { $in: loggedInUser.followedUsers }
    }).then((posts) => {
        posts.sort((a, b) => (a.createdAt < b.createdAt) ? 1 : -1);
        res.send({ posts });
    }).catch((e) => res.status(400).send());

}

// upload image
// uploads to assets (Should change to AWS S3)
function uploadImage(req, res) {
    var base64image = req.body.base64image;
    var imageName = req.body.name;

    // for deploy
    var savePath = path.join(__dirname, `../../dist/assets/images/${imageName}`);  
    // /Instagram-levi9-internship-heroku
    console.log(savePath);
    fs.writeFileSync(savePath, base64image, 'base64');

    // for developing
    // savePath = path.join(__dirname, `../../src/assets/images/${imageName}`);  
    // console.log(savePath);

    fs.writeFileSync(savePath, base64image, 'base64');

    res.send({});
}

// search posts
// in: filter
// out: posts with description that contains filter string
function search(req, res) {
    var filter = req.query.filter;

    if (filter !== "") {
        Post.find({
            description: { "$regex": filter, "$options": "i" }
        }).then((posts) => {
            posts.sort((a, b) => (a.createdAt < b.createdAt) ? 1 : -1);
            res.send({ posts });
        }).catch((e) => res.status(400).send(e));
    } else {
        Post.find().then((posts) => {
            posts.sort((a, b) => (a.createdAt < b.createdAt) ? 1 : -1);
            res.send({ posts });
        }).catch((e) => res.status(400).send(e));
    }

    
}


module.exports = {
    singlePost,
    newPost,
    comment,
    homePosts,
    uploadImage,
    search
}