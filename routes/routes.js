const express = require('express');

const router = express.Router();

const control = require('../control/controller');

router.post('/', control.home);

router.get('/', control.home);

router.post('/create', control.create);

router.get('/new', control.savePost);

router.post('/login', control.login);

router.post('/user', control.checkLogin);

router.post('/viewPostsByUser', control.viewPosts);

router.post('/viewAllPosts', control.viewAllPosts);

router.post('/blogPost', control.blogPost);

module.exports = router;