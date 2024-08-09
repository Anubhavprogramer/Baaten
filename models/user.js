const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    post: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "post",
        },
    ],
    profilePicture: { type: String, default: "default.jpg" },
});

module.exports = mongoose.model("user", userSchema);
