const mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    description: {
        type: String,
        trim: true,
    },
    createdAt: {
        type: Number,
        default: new Date().getTime()
    },
    comments: {
        type: [{
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                auto: true
            },
            author: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
            },
            text: {
                type: String,
                required: true,
                trim: true,
                minlength: 1
            },
            createdAt: {
                type: Number,
                required: true,
                default: new Date().getTime()
            }
        }],
        default: []
    }
});

var Post = mongoose.model('Post', PostSchema);

module.exports = {Post};