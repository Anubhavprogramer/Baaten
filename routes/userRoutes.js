const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const isLoggedIn = require('../middleware/authMiddleware');
const upload = require('../config/multerConfig');

router.get('/profile', isLoggedIn, userController.getProfile);
router.get('/profile/uploads', isLoggedIn, userController.getProfilePicture);
router.post('/upload/profile-picture', isLoggedIn, upload.single('profilePicture'), userController.uploadpicture);
 
module.exports = router;
