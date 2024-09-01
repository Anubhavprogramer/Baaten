const userModel = require('../models/user.js');
const getDataUri = require('../utils/dataUri');
const cloudinary = require('cloudinary').v2;

const getProfile = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.userid);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.render('profile', { user });
    } catch (error) {
        return res.status(500).send('An internal server error occurred');
    }
};
const getProfilePicture = async (req, res) => {
    res.render('profilePicture');
};
const uploadpicture = async (req, res) => {


   let user = await userModel.findOne({email: req.user.email})

   const file = req.file;
   const dataUri = getDataUri(file);

   const myCloud = await cloudinary.uploader.upload(dataUri.content);

    user.profilePicture = {
        url: myCloud.secure_url,
        public_id: myCloud.public_id
    };
    await user.save();
    res.redirect('/profile');
};

module.exports = {
    getProfile,
    getProfilePicture,
    uploadpicture
};
