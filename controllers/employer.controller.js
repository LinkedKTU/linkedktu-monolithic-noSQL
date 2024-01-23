const httpStatus = require('http-status');
const ApiDataSuccess = require('../scripts/responses/success/api-data-success');
const ApiError = require('../scripts/responses/error/api-error');
const {
    getAll,
    getOneById,
    create,
    getOneByQuery,
    sendEmail,
} = require('../services/base-service');
const Employer = require('../models/employer.model');
const { v4: uuidv4 } = require('uuid');
const { createLoginToken } = require('../scripts/helpers/jwt.helper');

const login = async (req, res, next) => {
    let employer;

    try {
        employer = await getOneByQuery(Employer.name, 'Email', req.body.email);
    } catch (error) {
        return next(new ApiError(error.message, httpStatus.NOT_FOUND));
    }

    if (employer && employer[0].length === 0) {
        return next(
            new ApiError(
                'Email or password is incorrect!',
                httpStatus.BAD_REQUEST
            )
        );
    }

    const employerObject = employer[0][0];

    const validPassword = employerObject.Password === req.body.password;

    if (!validPassword) {
        return next(
            new ApiError('Email or passwors is incorrect!'),
            httpStatus.BAD_REQUEST
        );
    }

    const access_token = createLoginToken(employerObject, res);

    ApiDataSuccess.send('Login succesfull!', httpStatus.OK, res, {
        access_token: access_token,
    });
};

const getEmployers = async (req, res, next) => {
    try {
        var employers = await getAll(Employer.name);
    } catch (error) {
        return next(new ApiError(error.message, httpStatus.NOT_FOUND));
    }

    if (employers && employers[0].length === 0) {
        return next(
            new ApiError('There have been an error!', httpStatus.NOT_FOUND)
        );
    }
    ApiDataSuccess.send(
        'Employers fetched succesfully!',
        httpStatus.OK,
        res,
        employers[0]
    );
};

const getEmployerById = async (req, res, next) => {
    const { id } = req.params;
    let employer;

    try {
        employer = await getOneById(Employer.name, id);
    } catch (error) {
        return next(new ApiError(error.message, httpStatus.NOT_FOUND));
    }

    if (employers && employer[0].length === 0) {
        return next(
            new ApiError(
                `There are no employers with this id: ${id}`,
                httpStatus.BAD_REQUEST
            )
        );
    }

    ApiDataSuccess.send(
        `Employer ${id} fetched!`,
        httpStatus.OK,
        res,
        employer[0]
    );
};

const createEmployer = async (req, res, next) => {
    const employerData = {
        ID: uuidv4(),
       ...req.body
    };

    try {
        var employer = await create(Employer.name, employerData);
    } catch (error) {
        return next(new ApiError(error.message, httpStatus.NOT_FOUND));
    }

    sendEmail(email, fullname, password);

    ApiDataSuccess.send(
        'Employer created succesfully!',
        httpStatus.OK,
        res,
        employer[0]
    );
};

const updateEmployerById = async (req, res, next) => {
    const { id } = req.params;

    const updatedEmployerData = {};

    let entries = Object.entries(req.body);

    for (const [key, value] of entries) {
        if (value) {
            updatedEmployerData[key] = value;
        }
    }

    try {
        var updatedEmployer = await update(Employer.name, id, updatedEmployerData);
    } catch (error) {
        return next(new ApiError(error.message, httpStatus.NOT_FOUND));
    }

    if (!updatedEmployer || updatedEmployer[0].length === 0) {
        return next(
            new ApiError(
                `There are no employers with this id: ${id}`,
                httpStatus.BAD_REQUEST
            )
        );
    }

    ApiDataSuccess.send(
        `Employer ${id} updated successfully!`,
        httpStatus.OK,
        res,
        updatedEmployer[0]
    );
};

const deleteEmployerById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const deletedEmployer = await deleteById(Employer.name, id);
        
        if (!deletedEmployer || deletedEmployer[0].length === 0) {
            return next(
                new ApiError(
                    `There are no employers with this id: ${id}`,
                    httpStatus.BAD_REQUEST
                )
            );
        }

        ApiDataSuccess.send(
            `Employer ${id} deleted successfully!`,
            httpStatus.OK,
            res
        );
    } catch (error) {
        return next(new ApiError(error.message, httpStatus.NOT_FOUND));
    }
};

module.exports = { getEmployers, getEmployerById, createEmployer, updateEmployerById, deleteEmployerById, login };


