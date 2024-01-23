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

module.exports = router;
