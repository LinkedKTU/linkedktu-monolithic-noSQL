const mongoose = require('mongoose');
const { Schema } = mongoose;

const JobPostSchema = new Schema({
    ID: {
        type: String,
        required: true,
        unique: true,
    },
    Title: {
        type: String,
        required: true,
    },
    Description: {
        type: String,
        required: false,
    },
    Company: {
        type: String,
        required: true,
    },
    Role: {
        type: String,
        required: true,
    },
    Technologies: {
        type: [String],
        required: true,
    },
    IsRemote: {
        type: Boolean,
        required: true,
    },
    Salary: {
        type: Number,
        required: true,
    },
    isAccepted: {
        type: Boolean,
        default: false,
    },
    Applicants: {
        type: [Schema.Types.ObjectId],
        ref: 'Student',
    },
    EmployerId: {
        type: Schema.Types.ObjectId,
        ref: 'Employer',
        required: true,
    },
});

const JobPost = mongoose.model('JobPost', JobPostSchema);

module.exports = JobPost;
