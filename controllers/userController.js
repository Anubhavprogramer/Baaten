const userModel = require('../models/user');

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

module.exports = {
    getProfile
};
