const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const connectDB = require('./db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const cloudinary = require('cloudinary');



require('dotenv').config();

const app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



connectDB();

cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

app.get('/', (req, res) => {
    res.render('index');
});

app.use('/user', authRoutes);
app.use(userRoutes);
app.use(postRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
