const mongoose = require('mongoose');
const _ = require('lodash');
const jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        minlength: 1,
    },
    password:{
        type: String,
        required: true,
        trim: true,
        minlength: 4,
    },
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
    },
    imageUrl: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    followedUsers: {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    },
    tokens: [{
        access: {
            type: String,
            require: true
        },
        token: {
            type: String,
            require: true
        }
    }]
});

UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject, ['_id','username', 'name', 'imageUrl', 'followedUsers']);
};

UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, 'PFHQMQwt2S8z').toString();

    user.tokens.push({access, token});

    return user.save().then(() => {
        return token;
    });
};

UserSchema.methods.removeToken = function (token) {
    var user = this;

    return user.updateOne({
        $pull: {
            tokens: {token}
        }
    });
};

UserSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;

    try {
        decoded = jwt.verify(token, 'PFHQMQwt2S8z');
    } catch (e) {
        return Promise.reject();
    }

    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};


var User = mongoose.model('User', UserSchema);

module.exports = {User};