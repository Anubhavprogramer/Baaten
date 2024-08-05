const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const isLoggedIn = require('../middleware/authMiddleware');

router.post('/create/post', isLoggedIn, postController.createPost);

router.post('/delete/post/:id', isLoggedIn, postController.deletePost);

router.get('/myposts', isLoggedIn, postController.getMyPosts);

router.get('/allposts', isLoggedIn, postController.getAllPosts);

module.exports = router;
