const {ObjectID} = require('mongodb');
const _ = require('lodash');

const {User} = require('../models/user');
const {Post} = require('../models/post');

// Login
// in: username, password
// out: user
function login(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({ username: username }).then((user) => {
        if (!user){
            return res.status(404).send({ text: 'Invalid username' });
        }
        if (user.password !== password){
            return res.status(404).send({ text: 'Invalid password' });
        }
        
        user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send({user});
        });
    }).catch((e) => res.status(400).send()); 
}

// Registration
// in: username, password, name, imageUrl
// out: new user
function registration(req, res) {
    var body = _.pick(req.body, ['username', 'password', 'name', 'imageUrl']);

    User.findOne({username: body.username}).then((user) => {
        if (user){
            return res.status(403).send({text: 'Username is already taken'});
        }
        var newUser = new User(body);

        newUser.save().then((newUser) => {
            res.send({newUser});
        });
    }).catch((e) => res.status(400).send());

}

// profile page: user name, avatar, list of posts and information if user is followed or not
// Get user info
// in: user id, logged in user id
// out: user info, info if following or not
function informations(req, res) {
    var loggedInUser = req.user;
    var userId = req.query.userId;

    if (!ObjectID.isValid(userId)) {
        return res.status(404).send({ text: 'Invalid user id' });
    }

    User.findById(userId).then((user) => {
        if (!user){
            return res.status(404).send({ text: 'Invalid user' });
        }

        let following = loggedInUser.followedUsers.includes(userId);
        
        res.send({user, following});

    }).catch((e) => res.status(400).send(e));
}

// Get user posts
// in: user id
// out: user posts
function posts(req, res) {
    var userId = req.params.userId;

    if (!ObjectID.isValid(userId)) {
        return res.status(404).send({ text: 'Invalid user id' });
    }

    Post.find({ 
        owner: ObjectID(userId)
    }).then((posts) => {
        posts.sort((a, b) => (a.createdAt < b.createdAt) ? 1 : -1);
        res.send({posts});
    }).catch((e) => res.status(400).send(e));
}

// in: filter (username)
// out: filtered users
function search(req, res) {
    var filter = req.query.filter;

    if (filter !== "") {
        User.find({
            username: { "$regex": filter, "$options": "i"}
        }).then((users) => {
            res.send({users});
        }).catch((e) => res.status(400).send(e));
    } else {
        User.find().then((users) => {
            res.send({users});
        }).catch((e) => res.status(400).send(e));
    }
}

// follow / unfollow user (from profile page)
// follow
// in: user id, logged in user id, flag (true => follow, false => unfollow)
// out: updated user
function follow(req, res){
    var loggedInUser = req.user;
    var flag = req.params.flag;
    var userId = req.params.userId;

    if (!ObjectID.isValid(userId)) {
        return res.status(404).send({ text: 'Invalid user id' });
    }

    if (flag === "true"){
        User.findOneAndUpdate({
            _id: loggedInUser._id,
            followedUsers: { $nin: userId }
        },
        {
            $push: {followedUsers: ObjectID(userId)}
        }, {new: true}).then((user) => {
            if (!user){
                return res.status(404).send({ text: 'You are already following this user' });
            }
            res.send({user});
        }).catch((e) => res.status(400).send(e));
    } else {
        User.findOneAndUpdate({
            _id: loggedInUser._id,
            followedUsers: { $in: userId }
        },
        {
            $pull: {followedUsers: ObjectID(userId)}
        }, {new: true}).then((user) => {
            if (!user){
                return res.status(404).send({ text: 'You are not following this user' });
            }
            res.send({user});
        }).catch((e) => res.status(400).send(e));
    }
}

//logout
function logout(req, res) {
    req.user.removeToken(req.token).then(() => {
        res.send();
    }, () => {
        res.status(400).send();
    });
}



module.exports = {
    login,
    registration,
    informations,
    posts,
    search,
    follow,
    logout
}