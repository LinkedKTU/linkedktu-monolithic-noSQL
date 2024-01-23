const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostSchema = new Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    company: {
        type: String,
    },
    role: {
        type: String,
    },
    technologies: {
        type: [String], // This represents an array of strings
    },
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
