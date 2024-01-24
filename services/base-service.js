const mongoose = require('../scripts/helpers/mongoose.helper');
const eventEmitter = require('../events/event-emitter.event');
const { model } = require('mongoose');

function sendEmail(email, fullName, password) {
    eventEmitter.emit('send_email', {
        to: email,
        subject: 'linkedKTU verification',
        template: 'student-password-template',
        context: {
            fullName: fullName,
            password: password,
        },
    });
}

const getAll = async (model) => {
    const result = await model.find({}).limit(10).exec();  
    return result;
};

const getOneById = async (model, id) => {
    const result = await model.find({ _id: id }).limit(10).exec(); 
    return result;
};


const create = async (model, data) => {
    const result = await model.create(data);
    return result;
};

const getAllByQuery = async (model, query, data) => {
    let queryObject = {};
    queryObject[query] = data;
    const result = await model.find(queryObject);
    return result;
};

const getOneByQuery = async (model, query, data) => {
    let queryObject = {};
    queryObject[query] = data;
    const result = await model.find(queryObject);
    return result;
};

const deleteById = async (model, id) => {
    deleteResult = await model.deleteOne({ _id: id });
    return deleteResult;
};

const updateById = async (model, id, updateData) => {
    const options = { new: true, runValidators: true };
    const updatedResult = await model.findByIdAndUpdate(id, updateData, options);
    return updatedResult;
};


// const updateByQuery = async (model, query, data) => '';

// const deleteByQuery = async (model, query) => '';

module.exports = {
    getAll,
    getOneById,
    create,
    getAllByQuery,
    getOneByQuery,
    updateById,
    // updateByQuery,
    deleteById,
    // deleteByQuery,
    sendEmail,
};
