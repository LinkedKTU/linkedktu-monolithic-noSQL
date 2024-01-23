const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const ApiError = require('../scripts/responses/error/api-error');

module.exports = async function (req, res, next) {
    const token = req.headers?.authorization?.split(' ')[1];

    if (!token) {
        return next(
            new ApiError('Access Denied', httpStatus.UNAUTHORIZED)
        ); 
    }

    jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, decoded) => {
        if (err) {
            return next(
                new ApiError('Invalid access token', httpStatus.BAD_REQUEST)
            );
        }

        req.user = decoded;

        next();
    });
};
