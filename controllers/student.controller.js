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
} = require('../services/base-service');
const { createLoginToken } = require('../scripts/helpers/jwt.helper');
const Student = require('../models/student.model');
const passwordHelper = require('../scripts/helpers/password.helper');
const { v4: uuidv4 } = require('uuid');

const login = async (req, res, next) => {
    let student;
    
    try {
        student = await getOneByQuery(Student, 'email', req.body.email);
    } catch (error) {
        return next(new ApiError(error.message, httpStatus.NOT_FOUND));
    }

    student = student[0];

    if(student.password !== req.body.password) {
        return next(new ApiError('Email or password is incorrect!', httpStatus.BAD_REQUEST));
    }

    const access_token = createLoginToken(student, res);

    ApiDataSuccess.send('Login succesfull', httpStatus.OK, res, { access_token });
};  

const createStudent = async (req, res, next) => {
    let student;
    try {
        student = await getOneByQuery(Student, 'email', req.body.email);
        console.log(student);
        if(student[0]) {
            return next(new ApiError('Student with this email already exists!', httpStatus.BAD_REQUEST));
        }
    } catch (error) {
    }

    const studentData = {
        ...req.body,
    };

    // sendEmail(email, fullname, studentPassword);

    try {
        var createdStudent = await create(Student, studentData);
    } catch (error) {
        return next(new ApiError(error.message, httpStatus.NOT_FOUND));
    }

    ApiDataSuccess.send(
        'Student created succesfully!',
        httpStatus.OK,
        res,
        createdStudent
    );
};

const getStudents = async (req, res, next) => {
    let result;

    try {
        result = await getAll(Student);
    } catch (error) {
        return next(new ApiError(error.message, httpStatus.NOT_FOUND));
    }

    console.log(result);

    ApiDataSuccess.send(
        'Students fetched succesfully',
        httpStatus.OK,
        res,
        result
    );
};

const getStudentById = async (req, res, next) => {
    const { id } = req.params;
    let student;

    try {
        student = await getOneById(Student, id, next);
    } catch (error) {
        return next(new ApiError(error.message, httpStatus.NOT_FOUND));
    }

    if (!student) {
        return next(
            new ApiError(
                `There is no student with this id: ${id}`,
                httpStatus.BAD_REQUEST
            )
        );
    }

    ApiDataSuccess.send(
        'Student with given id found',
        httpStatus.OK,
        res,
        student
    );
};

const getStudentsByTechnology = async (req, res, next) => {
    const { technology } = req.params;
    let studentsWithGivenTech;

    try {
        studentsWithGivenTech = await getAllByQuery(
            Student,
            'technologies',
            technology
        );
    } catch (error) {
        return next(new ApiError(error.message, httpStatus.NOT_FOUND));
    }

    if (studentsWithGivenTech[0].length === 0) {
        return next(
            new ApiError(
                `There is no student with given tech ${technology}`,
                httpStatus.BAD_REQUEST
            )
        );
    }

    ApiDataSuccess.send(
        'Students with given skill found',
        httpStatus.OK,
        res,
        studentsWithGivenTech[0]
    );
};

const deleteById = async (req, res, next) => {
    const { id } = req.params;
    
    try {
        const deletedStudent = await Student.findByIdAndDelete(id);

        if (!deletedStudent) {
            return next(
                new ApiError(
                    `There is no student with this id: ${id}`,
                    httpStatus.NOT_FOUND
                )
            );
        }

        ApiDataSuccess.send(
            `Student ${id} deleted successfully`,
            httpStatus.OK,
            res,
            deletedStudent
        );
    } catch (error) {
        return next(new ApiError(error.message, httpStatus.INTERNAL_SERVER_ERROR));
    }
};

const updateStudentById = async (req, res, next) => {
    const { id } = req.params;
    const updateData = req.body; 

    try {
        const updatedStudent = await updateById(Student, id, updateData);

        if (!updatedStudent) {
            return next(
                new ApiError(
                    `There is no student with this id: ${id}`,
                    httpStatus.NOT_FOUND
                )
            );
        }

        ApiDataSuccess.send(
            `Student ${id} updated successfully!`,
            httpStatus.OK,
            res,
            updatedStudent
        );
    } catch (error) {
        return next(new ApiError(error.message, httpStatus.INTERNAL_SERVER_ERROR));
    }
};

const updateStudentPassword = async (req, res, next) => {
    const { id } = req.params;
    const { password } = req.body;

    try {
        const updatedStudent = await updatePasswordById(Student, id, { password });

        if (!updatedStudent) {
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
            updatedStudent
        );
    } catch (error) {
        return next(new ApiError(error.message, httpStatus.INTERNAL_SERVER_ERROR));
    }
};


module.exports = {
    login,
    getStudents,
    getStudentById,
    getStudentsByTechnology,
    createStudent,
    deleteById,
    updateStudentById,
    updateStudentPassword,
};
