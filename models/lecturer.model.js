const mongoose = require('mongoose');
const { Schema } = mongoose;
const BaseUser = require('./base-user.model');
const Student = require('./student.model');

const LecturerSchema = new Schema({
    approvedStudents: [{
        type: Schema.Types.ObjectId,
        ref: 'Student',
    }],
});

const Lecturer = mongoose.model('Lecturer', LecturerSchema);

module.exports = Lecturer;
