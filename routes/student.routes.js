const express = require('express');
const studentController = require('../controllers/student.controller');
const router = express.Router();
const bodyValidator = require('../middlewares/body-validator.middleware');
const schema = require('../validations/student.validation');

router
    .route('/')
    .get(studentController.getStudents);

router
    .route('/:id')
    .get(studentController.getStudentById);

router
    .route('/auth/login')
    .post(bodyValidator(schema.loginValidation), studentController.login);

router
    .route('/auth/register')
    .post(studentController.createStudent);

router
    .route('/technologies/:technology')
    .get(studentController.getStudentsByTechnology);


module.exports = router;
