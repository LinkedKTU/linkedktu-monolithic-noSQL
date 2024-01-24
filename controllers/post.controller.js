const ApiError = require('../scripts/responses/error/api-error');
const ApiDataSuccess = require('../scripts/responses/success/api-data-success');
const {
    getAll,
    getOneById,
    create,
    deleteById,
} = require('../services/base-service');
const JobPost = require('../models/job-post.model');
const httpStatus = require('http-status');
const { v4: uuidv4 } = require('uuid');

const getJobPosts = async (req, res, next) => {
    let jobPosts;

    try {
        jobPosts = await getAll(JobPost);
    } catch (error) {
        return next(new ApiError(error.message, httpStatus.NOT_FOUND));
    }

    if (jobPosts[0].length === 0) {
        return next(
            new ApiError('There are no job posts found!', httpStatus.NOT_FOUND)
        );
    }

    ApiDataSuccess.send(
        'Job posts fetched succesfully!',
        httpStatus.OK,
        res,
        jobPosts
    );
};

const getJobPostById = async (req, res, next) => {
    const { id } = req.params;
    let jobPost;

    try {
        jobPost = await getOneById(JobPost, id);
    } catch (error) {
        return next(new ApiError(error.message, httpStatus.NOT_FOUND));
    }

    // CHECK HERE!
    if (jobPost[0].length === 0) {
        return next(
            new ApiError(
                `There are no job post with id of ${id}`,
                httpStatus.BAD_REQUEST
            )
        );
    }

    ApiDataSuccess.send(
        `Jobpost with id of ${id} fetched!`,
        httpStatus.OK,
        res,
        jobPost
    );
};

const createJobPost = async (req, res, next) => {
    const {
        title,
        description,
        company,
        role,
        technologies,
        isRemote,
        salary,
        isAccepted,
        applicants,
    } = req.body;

    const jobPostData = {
        ID: uuidv4(),
        Title: title,
        Description: description,
        Company: company,
        Role: role,
        Technologies: technologies,
        IsRemote: isRemote,
        Salary: salary,
        isAccepted: isAccepted,
        Applicants: applicants,
    };

    let jobPost;

    try {
        jobPost = await create(JobPost, jobPostData);
    } catch (error) {
        return next(new ApiError(error.message, httpStatus.NOT_FOUND));
    }

    if (!jobPost) {
        return next(
            new ApiError('There have been an error!', httpStatus.BAD_REQUEST)
        );
    }

    ApiDataSuccess.send(
        'Job post created succesfully!',
        httpStatus.OK,
        res,
        jobPost
    );
};

const deleteJobPost = async (req, res, next) => {
    const { id } = req.params;
    let deletedJobPost;

    try {
        deletedJobPost = await deleteById(JobPost, id);
    } catch (error) {
        return next(new ApiError(error.message, httpStatus.NOT_FOUND));
    }
    // CHECK HERE!
    if (!deletedJobPost) {
        return next(
            new ApiError(`Couldn't delete post ${id}`, httpStatus.BAD_REQUEST)
        );
    }

    ApiDataSuccess.send(
        `Job post id: ${id} deleted!`,
        httpStatus.OK,
        res,
        deletedJobPost
    );
};

const updateJobPostById = async (req, res, next) => {
    const { id } = req.params;
    const updateData = req.body;
    let updatedJobPost;

    try {
        updatedJobPost = await updateById(JobPost, id, updateData);
    } catch (error) {
        return next(new ApiError(error.message, httpStatus.NOT_FOUND));
    }

    if (!updatedJobPost) {
        return next(
            new ApiError(
                `There are no job post with id of ${id}`,
                httpStatus.BAD_REQUEST
            )
        );
    }

    ApiDataSuccess.send(
        `Job post with id of ${id} updated!`,
        httpStatus.OK,
        res,
        updatedJobPost
    );
};

module.exports = { getJobPosts, getJobPostById, createJobPost, deleteJobPost, updateJobPostById };
