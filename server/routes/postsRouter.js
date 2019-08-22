const express = require('express');
const router = express.Router();

var postsCtrl = require('../controllers/postsCtrl');
var {authenticate} = require('../middleware/authenticate');

router.get('/single/:postId', postsCtrl.singlePost);
router.post('/newPost', authenticate, postsCtrl.newPost);
router.patch('/comment/:postId', authenticate, postsCtrl.comment);
router.get('/home', authenticate, postsCtrl.homePosts);
router.post('/uploadImage', authenticate, postsCtrl.uploadImage);
router.get('/search', postsCtrl.search);

module.exports = router;