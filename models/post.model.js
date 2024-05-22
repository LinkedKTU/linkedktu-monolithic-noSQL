const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostSchema = new Schema({
    ID: {
        type: String,
        required: true,
        unique: true,
    },
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
        type: [String], 
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Student',
        required: true,
    },
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
