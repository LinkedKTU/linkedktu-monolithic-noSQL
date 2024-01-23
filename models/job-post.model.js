const mongoose = require('mongoose');
const { Schema } = mongoose;
const Student = require('./student.model');
const Post = require('./post.model');

const JobPostSchema = new Schema({
    isRemote: {
        type: Boolean,
    },
    salary: {
        type: String,
    },
    isAccepted: {
        type: Boolean,
    },
    applicants: [{
        type: Schema.Types.ObjectId,
        ref: 'Student',
    }],
});

const JobPost = mongoose.model('JobPost', JobPostSchema);

module.exports = JobPost;
