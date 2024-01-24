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
const Employer = require('../models/employer.model');
const { v4: uuidv4 } = require('uuid');
const { createLoginToken } = require('../scripts/helpers/jwt.helper');

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

    ApiDataSuccess.send('Login succesfull!', httpStatus.OK, res, {
       access_token
    });
};

const getEmployers = async (req, res, next) => {
    try {
        var employers = await getAll(Employer);

        ApiDataSuccess.send(
            'Employers fetched succesfully!',
            httpStatus.OK,
            res,
            employers
        );
    } catch (error) {
        console.log(error);
        return next(new ApiError(error.message, httpStatus.INTERNAL_SERVER_ERROR));
    }
};

const getEmployerById = async (req, res, next) => {
    const { id } = req.params;
    let employer;

    try {
        employer = await getOneById(Employer, id);
    } catch (error) {
        return next(new ApiError(error.message, httpStatus.NOT_FOUND));
    }

    if (employer && employer[0].length === 0) {
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
       ...req.body
    };

    try {
        var existingEmployer = await getOneByQuery(Employer, "email", req.body.email);
        if(existingEmployer[0]) {
            return next(new ApiError('Employer with this email already exists!', httpStatus.BAD_REQUEST));
        }
    } catch (error) {
    }

    try {
        var employer = await create(Employer, employerData);
    } catch (error) {
        return next(new ApiError(error.message, httpStatus.NOT_FOUND));
    }

    console.log('employer: ', employer);
    // sendEmail(email, fullname, password);

    ApiDataSuccess.send(
        'Employer created succesfully!',
        httpStatus.OK,
        res,
        employer[0]
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
            `Employer ${id} deleted successfully!`,
            httpStatus.OK,
            res
        );
    } catch (error) {
        return next(new ApiError(error.message, httpStatus.INTERNAL_SERVER_ERROR));
    }
};

const updateEmployerPassword = async (req, res, next) => {
    const { id } = req.params;
    const { password } = req.body;

    try {
        const updatedEmployer = await updateById(Employer, id, { password });

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

module.exports = { getEmployers, getEmployerById, createEmployer, updateEmployerById, deleteEmployerById, login, updateEmployerPassword };
