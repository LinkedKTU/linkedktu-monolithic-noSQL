const express = require('express');
const router = express.Router();
const lecturerController  = require('../controllers/lecturer.controller');

router.route('/').get(lecturerController.getLecturers);

router.route('/:id').get(lecturerController.getLecturerById);

router.route('/auth/register').post(lecturerController.createLecturer);

router.route('/auth/login').post(lecturerController.login);

router.route('/:id').delete(lecturerController.deleteLecturerById);

router.route('/:id').put(lecturerController.updateLecturerById);

module.exports = router;
