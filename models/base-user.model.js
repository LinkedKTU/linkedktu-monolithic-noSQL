const mongoose = require('mongoose');
const { Schema } = mongoose;

const BaseUserSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: String,
    address: String,
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    accountType: {
        type: String,
        required: true,
    },
});

const BaseUser = mongoose.model('BaseUser', BaseUserSchema);

module.exports = BaseUser;
