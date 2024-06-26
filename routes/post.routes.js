const express = require('express');
const postController = require('../controllers/post.controller');

const router = express.Router();

router
    .route('/jobposts/')
    .get(postController.getJobPosts);

router
    .route('/jobposts/:id')
    .get(postController.getJobPostById);

router
    .route('/jobposts/create')
    .post(postController.createJobPost);

router
    .route('/jobposts/delete/:id')
    .delete(postController.deleteJobPost);

router
    .route('/jobposts/update/:id')
    .put(postController.updateJobPostById);

router
    .route('/jobposts/employer/:employerId')
    .get(postController.getJobPostsByEmployerId);

router
    .route('/default/student/:studentId')
    .get(postController.getPostsByStudentId);

router
    .route('/default/')
    .get(postController.getJobPosts);

module.exports = router;
