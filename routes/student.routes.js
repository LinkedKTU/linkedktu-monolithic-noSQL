const express = require('express');
const studentController = require('../controllers/student.controller');
const router = express.Router();
const bodyValidator = require('../middlewares/body-validator.middleware');
const schema = require('../validations/student.validation');

router.route('/').get(studentController.getStudents);

router.route('/:id').get(studentController.getStudentById);

router.route('/auth/login').post(studentController.login);

router.route('/auth/register').post(studentController.createStudent);

router.route('/technologies/:technology').get(studentController.getStudentsByTechnology);

router.route('/:id').delete(studentController.deleteById);

router.route('/:id').put(studentController.updateStudentById);

router.route('/update-password/:id').put(studentController.updateStudentPassword);

router.post('/:studentId/apply/:jobId', studentController.applyJob);

module.exports = router;
