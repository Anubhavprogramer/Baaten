const postModel = require('../models/post');
const userModel = require('../models/user');

const createPost = async (req, res) => {
    try {
        const title = req.body.title;
        const content = req.body.content;

        // Check if title and content are provided
        if (!title || !content) {
            console.log('Title and content are required');
            return res.status(400).send('Title and content are required');
        }

        // Check if the user is authenticated
        const user = await userModel.findById(req.user.userid);
        if (!user) {
            console.log('User not found');
            return res.status(404).send('User not found');
        }

        // Check if a photo is uploaded
        let photoFilename = '';
        if (req.file) {
            photoFilename = req.file.filename;
        }

        // Create a new post
        const newPost = await postModel.create({
            user: req.user.userid,
            title,
            content,
            photo: photoFilename // Add the filename of the uploaded photo
        });

        // Add the new post ID to the user's posts array
        user.post.push(newPost._id); // Assuming 'posts' is the correct field in the user schema
        await user.save();

        // Redirect to the user's posts page
        res.redirect('/myposts');
    } catch (error) {
        console.error('Error creating post:', error);
        return res.status(500).send('Server Error');
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
        const user = await userModel.findById(req.user.userid);
        res.render('myPost', { posts, user });
    } catch (error) {
        return res.status(500).send('An internal server error occurred');
    }
};

const getAllPosts = async (req, res) => {
    try {
        const posts = await postModel.find().populate('user', 'username');
        const user = await userModel.findById(req.user.userid);
        res.render('allPost', { posts, user });
    } catch (error) {
        return res.status(500).send('An internal server error occurred');
    }
};

const likePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user.userid;

        // Find the post and update the likes array
        const post = await postModel.findById(postId);
        if (!post) {
            return res.status(404).send('Post not found');
        }
        
        if(post.likes.indexOf(userId) === -1){
            post.likes.push(userId);
            await post.save();
        }
        else{
            post.likes.splice(post.likes.indexOf(userId), 1);
            await post.save();
        }

        res.redirect('/allposts');
    } catch (error) {
        console.error('Error liking post:', error);
        return res.status(500).send('An internal server error occurred');
    }
};
const editPost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user.userid;

        const post = await postModel.findById(postId);
        if (!post) {
            return res.status(404).send('Post not found');
        }

        if(post.user.toString() !== userId){
            return res.status(401).send('Unauthorized');
        }

        res.render('editPost', { post });
    } catch (error) {
        console.error('Error liking post:', error);
        return res.status(500).send('An internal server error occurred');
    }
};

const updatePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user.userid;
        const { title, content } = req.body;

        const post = await postModel.findById(postId);
        if (!post) {
            return res.status(404).send('Post not found');
        }

        if(post.user.toString() !== userId){
            return res.status(401).send('Unauthorized');
        }

        post.title = title;
        post.content = content;
        await post.save();

        res.redirect('/myposts');
    } catch (error) {
        console.error('Error updating post:', error);
        return res.status(500).send('An internal server error occurred');
    }
}


module.exports = {
    createPost,
    deletePost,
    getMyPosts,
    getAllPosts,
    likePost,
    editPost,
    updatePost
};
