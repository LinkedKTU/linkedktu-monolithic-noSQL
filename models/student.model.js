const mongoose = require('mongoose');
const { Schema } = mongoose;
const BaseUser = require('./base-user.model');
const Post = require('./post.model');
const JobPost = require('./job-post.model');
const Lecturer = require('./lecturer.model');

const StudentSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
    },
    school: {
        type: String,
    },
    city: {
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
    experience: [String],
    appliedJobs: [{
        type: Schema.Types.ObjectId,
        ref: 'JobPost',
    }],
    lecturersThatApproved: [{
        type: Schema.Types.ObjectId,
        ref: 'Lecturer',
    }],
    phone: String,
    address: String,
    image : String,
});

StudentSchema.pre('find', function (next) {
    this.populate('appliedJobs');
    next();
});

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;
