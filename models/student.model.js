const mongoose = require('mongoose');
const { Schema } = mongoose;
const BaseUser = require('./base-user.model');
const Post = require('./post.model');
const JobPost = require('./job-post.model');
const Lecturer = require('./lecturer.model');

const StudentSchema = new Schema({
    school: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    technologies: {
        type: [String],
        required: true,
    },
    languages: {
        type: [String],
    },
    experience: [{
        type: Schema.Types.ObjectId,
        ref: 'Post',
    }],
    appliedJobs: [{
        type: Schema.Types.ObjectId,
        ref: 'JobPost',
    }],
    lecturersThatApproved: [{
        type: Schema.Types.ObjectId,
        ref: 'Lecturer',
    }],
});

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;
