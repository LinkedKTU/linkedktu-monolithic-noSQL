const express = require('express');
const employerController = require('../controllers/employer.controller');
const router = express.Router();

router.route('/auth/register').post(employerController.createEmployer);

router.route('/auth/login').post(employerController.login);

router.route('/update-password/:id').put(employerController.updateEmployerPassword);

router.route('/create-job').post(employerController.createJobPost);

router.route('/jobs').get(employerController.getJobPosts);

router.route('/jobs/:employerId').get(employerController.getJobPostsByEmployerId);

router.route('/:id').get(employerController.getEmployerById);

router.route('/:id').delete(employerController.deleteEmployerById);

router.route('/:id').put(employerController.updateEmployerById);

router.route('/').get(employerController.getEmployers);

module.exports = router;
