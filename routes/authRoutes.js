const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login/check', authController.loginUser);

router.get('/logout', authController.logoutUser);

router.get('/signup', (req, res) => {
    res.render('createAccount');
});

router.post('/signup', authController.registerUser);

module.exports = router;
