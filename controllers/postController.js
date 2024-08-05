const postModel = require('../models/post');

const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            console.log('Title and content are required');
            return res.status(400).send('Title and content are required');
        }

        const newPost = await postModel.create({
            user: req.user.userid,
            title,
            content
        });

        res.redirect('/myposts');
    } catch (error) {
        console.error('Error creating post:', error);
        return res.status(500).send('An internal server error occurred');
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
