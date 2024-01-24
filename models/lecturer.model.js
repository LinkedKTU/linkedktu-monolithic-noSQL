const mongoose = require('mongoose');
const { Schema } = mongoose;
const BaseUser = require('./base-user.model');
const Student = require('./student.model');

const LecturerSchema = new Schema({
    approvedStudents: [{
        type: Schema.Types.ObjectId,
        ref: 'Student',
    }],
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    name: {
        type: String,
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
    phone: String,
    address: String,
});

const Lecturer = mongoose.model('Lecturer', LecturerSchema);

module.exports = Lecturer;
