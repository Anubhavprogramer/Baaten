const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const isLoggedIn = require('../middleware/authMiddleware');
const upload = require('../config/multerConfig');

router.post('/create/post', isLoggedIn, upload, postController.createPost);

router.post('/delete/post/:id', isLoggedIn, postController.deletePost);

router.get('/myposts', isLoggedIn, postController.getMyPosts);

router.get('/allposts', isLoggedIn, postController.getAllPosts);

router.post('/like/post/:id', isLoggedIn, postController.likePost);

router.get('/edit/post/:id', isLoggedIn, postController.editPost);

router.post('/create/post', isLoggedIn, postController.updatePost);

module.exports = router;
