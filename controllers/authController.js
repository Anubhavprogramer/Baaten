const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).send('User not found');
        }

        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                return res.status(500).send('Error while comparing passwords');
            }

            if (result) {
                const token = jwt.sign({ email: email, userid: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                res.cookie('jwt', token, { httpOnly: true, secure: true });
                return res.redirect('/profile');
            } else {
                return res.status(401).send('Incorrect password');
            }
        });
    } catch (error) {
        return res.status(500).send('An internal server error occurred');
    }
};

const logoutUser = (req, res) => {
    res.clearCookie('jwt');
    res.redirect('/');
};

const registerUser = async (req, res) => {
    const { email, password, name, username, age } = req.body;
    const user = await userModel.findOne({ email });

    if (user) {
        return res.status(400).send('User already exists');
    }

    bcrypt.genSalt(10, (err, salt) => {
        if (err) return res.status(500).send('Error while generating salt');

        bcrypt.hash(password, salt, async (err, hash) => {
            if (err) return res.status(500).send('Error while hashing password');

            const newUser = await userModel.create({
                username,
                email,
                age,
                name,
                password: hash
            });

            const token = jwt.sign({ email: email, userid: newUser._id }, process.env.JWT_SECRET);
            res.cookie('jwt', token, { httpOnly: true, secure: true });
            res.redirect('/profile');
        });
    });
};

module.exports = {
    loginUser,
    logoutUser,
    registerUser
};
