const httpStatus = require('http-status');
const ApiDataSuccess = require('../scripts/responses/success/api-data-success');
const ApiError = require('../scripts/responses/error/api-error');

const {
    getAll,
    getOneById,
    create,
    getOneByQuery,
    sendEmail,
    updateById,
    deleteById,
} = require('../services/base-service');

const Lecturer = require('../models/lecturer.model');
const { v4: uuidv4 } = require('uuid');
const { createLoginToken } = require('../scripts/helpers/jwt.helper');

const login = async (req, res, next) => {
    let lecturer;

    try {
        lecturer = await getOneByQuery(Lecturer, 'email', req.body.email);
    } catch (error) {
        return next(new ApiError(error.message, httpStatus.NOT_FOUND));
    }

    lecturer = lecturer[0];

    if(lecturer.password !== req.body.password) {
        return next(new ApiError('Email or password is incorrect!', httpStatus.BAD_REQUEST));
    }

    const access_token = createLoginToken(lecturer, res);

    ApiDataSuccess.send('Login succesfull!', httpStatus.OK, res, {
       access_token
    });
};


const getLecturers = async (req, res, next) => {
    try {
        var lecturers = await getAll(Lecturer);

        ApiDataSuccess.send(
            'Lecturers fetched successfully!',
            httpStatus.OK,
            res,
            lecturers
        );
    } catch (error) {
        console.log(error);
        return next(new ApiError(error.message, httpStatus.INTERNAL_SERVER_ERROR));
    }
};

const getLecturerById = async (req, res, next) => {
    const { id } = req.params;
    let lecturer;

    try {
        lecturer = await getOneById(Lecturer, id);
    } catch (error) {
        return next(new ApiError(error.message, httpStatus.NOT_FOUND));
    }

    if (lecturer[0].length === 0) {
        return next(
            new ApiError(
                `There are no lecturer with id of ${id}`,
                httpStatus.BAD_REQUEST
            )
        );
    }

    ApiDataSuccess.send(
        `Lecturer with id of ${id} fetched!`,
        httpStatus.OK,
        res,
        lecturer
    );
};

const createLecturer = async (req, res, next) => {
    let lecturer;
    try {
        lecturer = await getOneByQuery(Lecturer, 'email', req.body.email);
        console.log(lecturer);
        if(lecturer[0]) {
            return next(new ApiError('Lecturer with this email already exists!', httpStatus.BAD_REQUEST));
        }
    } catch (error) {
    }

    const lecturerData = {
        ...req.body,
    };

    // sendEmail(email, fullname, lecturerPassword);

    try {
        var createdLecturer = await create(Lecturer, lecturerData);
    } catch (error) {
        return next(new ApiError(error.message, httpStatus.NOT_FOUND));
    }

    ApiDataSuccess.send(
        'Lecturer created succesfully!',
        httpStatus.OK,
        res,
        createdLecturer
    );
};

const updateLecturerById = async (req, res, next) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        var updatedLecturer = await updateById(Lecturer, id, updateData);
    } catch (error) {
        return next(new ApiError(error.message, httpStatus.NOT_FOUND));
    }

    ApiDataSuccess.send(
        `Lecturer with id of ${id} updated!`,
        httpStatus.OK,
        res,
        updatedLecturer
    );
};

const deleteLecturerById = async (req, res, next) => {
    const { id } = req.params;
    let lecturer;

    try {
        lecturer = await deleteById(Lecturer, id);
    } catch (error) {
        return next(new ApiError(error.message, httpStatus.NOT_FOUND));
    }

    if (!lecturer) {
        return next(
            new ApiError(
                `There are no lecturer with id of ${id}`,
                httpStatus.BAD_REQUEST
            )
        );
    }

    ApiDataSuccess.send(
        `Lecturer with id of ${id} deleted!`,
        httpStatus.OK,
        res,
        lecturer
    );
};

module.exports = { login, getLecturers, getLecturerById, createLecturer, updateLecturerById, deleteLecturerById};
