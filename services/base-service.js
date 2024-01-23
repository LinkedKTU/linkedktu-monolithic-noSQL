const sequelize = require('../scripts/helpers/sequelize.helper');
const eventEmitter = require('../events/event-emitter.event');

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

};

const getAllByQuery = async (model, key, query) => {

};
  

const getOneById = async (model, id) => {

};

const getOneByQuery = async (model, key, query) => {

};

const create = async (model, data) => {

};


// const updateById = async (model, id, data) => '';

// const updateByQuery = async (model, query, data) => '';

// const deleteById = async (model, id) => '';

// const deleteByQuery = async (model, query) => '';

module.exports = {
    getAll,
    getOneById,
    getOneByQuery,
    getAllByQuery,
    create,
    // updateById,
    // updateByQuery,
    // deleteById,
    // deleteByQuery,
    sendEmail,
};
