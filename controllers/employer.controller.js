const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const ApiError = require('../scripts/responses/error/api-error');
const ApiDataSuccess = require('../scripts/responses/success/api-data-success');
const {
    getOneByQuery,
    getAll,
    getOneById,
    getAllByQuery,
    create,
    sendEmail,
    updateById,
    updatePasswordById,
    deleteById,
} = require('../services/base-service');
const { createLoginToken } = require('../scripts/helpers/jwt.helper');
const Employer = require('../models/employer.model');
const passwordHelper = require('../scripts/helpers/password.helper');
const { v4: uuidv4 } = require('uuid');

const login = async (req, res, next) => {
    let employer;

    try {
        employer = await getOneByQuery(Employer, 'email', req.body.email);
    } catch (error) {
        return next(new ApiError(error.message, httpStatus.NOT_FOUND));
    }

    employer = employer[0];

    if(employer.password !== req.body.password) {
        return next(new ApiError('Email or password is incorrect!', httpStatus.BAD_REQUEST));
    }

    const access_token = createLoginToken(employer, res);

    ApiDataSuccess.send('Login successful!', httpStatus.OK, res, {
       access_token
    });
};

const createEmployer = async (req, res, next) => {
    let employer;
    try {
        employer = await getOneByQuery(Employer, 'email', req.body.email);
        console.log(employer);
        if(employer[0]) {
            return next(new ApiError('Employer with this email already exists!', httpStatus.BAD_REQUEST));
        }
    } catch (error) {
    }

    const employerData = {
        ...req.body,
    };

    try {
        var createdEmployer = await create(Employer, employerData);
    } catch (error) {
        return next(new ApiError(error.message, httpStatus.NOT_FOUND));
    }

    ApiDataSuccess.send(
        'Employer created successfully!',
        httpStatus.OK,
        res,
        createdEmployer
    );
};

const getEmployers = async (req, res, next) => {
    let result;

    try {
        result = await getAll(Employer);
    } catch (error) {
        return next(new ApiError(error.message, httpStatus.NOT_FOUND));
    }

    console.log(result);

    ApiDataSuccess.send(
        'Employers fetched successfully',
        httpStatus.OK,
        res,
        result
    );
};

const getEmployerById = async (req, res, next) => {
    const { id } = req.params;
    let employer;

    try {
        employer = await getOneById(Employer, id, next);
    } catch (error) {
        return next(new ApiError(error.message, httpStatus.NOT_FOUND));
    }

    if (!employer) {
        return next(
            new ApiError(
                `There is no employer with this id: ${id}`,
                httpStatus.BAD_REQUEST
            )
        );
    }

    ApiDataSuccess.send(
        'Employer with given id found',
        httpStatus.OK,
        res,
        employer
    );
};

const updateEmployerById = async (req, res, next) => {
    const { id } = req.params;
    const updateData = req.body; 

    try {
        const updatedEmployer = await updateById(Employer, id, updateData);

        if (!updatedEmployer) {
            return next(
                new ApiError(
                    `There is no employer with this id: ${id}`,
                    httpStatus.NOT_FOUND
                )
            );
        }

        ApiDataSuccess.send(
            `Employer ${id} updated successfully!`,
            httpStatus.OK,
            res,
            updatedEmployer
        );
    } catch (error) {
        return next(new ApiError(error.message, httpStatus.INTERNAL_SERVER_ERROR));
    }
};

const deleteEmployerById = async (req, res, next) => {
    const { id } = req.params;
    
    try {
        const deletedEmployer = await Employer.findByIdAndDelete(id);

        if (!deletedEmployer) {
            return next(
                new ApiError(
                    `There is no employer with this id: ${id}`,
                    httpStatus.NOT_FOUND
                )
            );
        }

        ApiDataSuccess.send(
            `Employer ${id} deleted successfully`,
            httpStatus.OK,
            res,
            deletedEmployer
        );
    } catch (error) {
        return next(new ApiError(error.message, httpStatus.INTERNAL_SERVER_ERROR));
    }
};

const updateEmployerPassword = async (req, res, next) => {
    const { id } = req.params;
    const { password } = req.body;

    try {
        const updatedEmployer = await updatePasswordById(Employer, id, { password });

        if (!updatedEmployer) {
            return next(
                new ApiError(
                    `There is no employer with this id: ${id}`,
                    httpStatus.NOT_FOUND
                )
            );
        }

        ApiDataSuccess.send(
            `Employer ${id} password updated successfully!`,
            httpStatus.OK,
            res,
            updatedEmployer
        );
    } catch (error) {
        return next(new ApiError(error.message, httpStatus.INTERNAL_SERVER_ERROR));
    }
};

module.exports = {
    login,
    createEmployer,
    getEmployers,
    getEmployerById,
    updateEmployerById,
    deleteEmployerById,
    updateEmployerPassword,
};
