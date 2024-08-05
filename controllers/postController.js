const postModel = require('../models/post');
const userModel = require('../models/user');

const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            console.log('Title and content are required');
            return res.status(400).send('Title and content are required');
        }

        // Find the user by email (assuming req.user.email is set correctly)
        const user = await userModel.findById(req.user.userid);

        if (!user) {
            console.log('User not found');
            return res.status(404).send('User not found');
        }

        // Create a new post
        const newPost = await postModel.create({
            user: req.user.userid,
            title,
            content
        });

        // Add the new post ID to the user's posts array
        user.post.push(newPost._id);
        await user.save();

        res.redirect('/myposts');
    } catch (error) {
        console.error('Error creating post:', error);
        return res.status(500).send(error);
    }
};


const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        await postModel.findByIdAndDelete(id);
        res.redirect('/myposts');
    } catch (error) {
        return res.status(500).send('An internal server error occurred');
    }
};

const getMyPosts = async (req, res) => {
    try {
        const posts = await postModel.find({ user: req.user.userid });
        res.render('myPost', { posts });
    } catch (error) {
        return res.status(500).send('An internal server error occurred');
    }
};

const getAllPosts = async (req, res) => {
    try {
        const posts = await postModel.find().populate('user', 'username');
        res.render('allPost', { posts });
    } catch (error) {
        return res.status(500).send('An internal server error occurred');
    }
};

module.exports = {
    createPost,
    deletePost,
    getMyPosts,
    getAllPosts
};
