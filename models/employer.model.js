const mongoose = require('mongoose');
const { Schema } = mongoose;
const JobPost = require('./job-post.model');
const BaseUser = require('./base-user.model');

const EmployerSchema = new Schema({
    city: {
        type: String,
    },
    isInternshipRemote: {
        type: Boolean,
    },
    email: {
        type: String,
    },
    isWorkRemote: {
        type: Boolean,
    },
    password: {
        type: String,
    },
    name: {
        type: String,
    },
    technologies: {
        type: [String],
    },
    languages: {
        type: [String],
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    accountType: {
        type: String,
    },
    jobPosts: [{
        type: Schema.Types.ObjectId,
        ref: 'JobPost',
    }],
});

const Employer = mongoose.model('Employer', EmployerSchema);

module.exports = Employer;
