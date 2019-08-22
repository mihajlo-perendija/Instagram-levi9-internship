const express = require('express');
const router = express.Router();

var usersCtrl = require('../controllers/usersCtrl');
var {authenticate} = require('../middleware/authenticate');

router.post('/login', usersCtrl.login);
router.get('/informations', authenticate, usersCtrl.informations);
router.get('/posts/:userId', authenticate, usersCtrl.posts);
router.get('/search', usersCtrl.search);
router.patch('/follow/:flag/:userId', authenticate, usersCtrl.follow);
router.delete('/logout', authenticate, usersCtrl.logout);


module.exports = router;