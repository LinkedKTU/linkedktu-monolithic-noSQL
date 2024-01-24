const express = require('express');
const employerController = require('../controllers/employer.controller');
const router = express.Router();

router.route('/').get(employerController.getEmployers);

router.route('/:id').get(employerController.getEmployerById);

router.route('/auth/register').post(employerController.createEmployer);

router.route('/auth/login').post(employerController.login);

router.route('/:id').delete(employerController.deleteEmployerById);

router.route('/:id').put(employerController.updateEmployerById);

module.exports = router;
