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
    isWorkRemote: {
        type: Boolean,
    },
    technologies: {
        type: [String],
    },
    languages: {
        type: [String],
    },
    jobPosts: [{
        type: Schema.Types.ObjectId,
        ref: 'JobPost',
    }],
});

const Employer = mongoose.model('Employer', EmployerSchema);

module.exports = Employer;
