const httpStatus = require('http-status');
const ApiError = require('../scripts/responses/error/api-error');
const { login: studentLogin } = require('../controllers/student.controller');
const { login: employerLogin } = require('../controllers/employer.controller');
const { login: lecturerLogin } = require('../controllers/lecturer.controller');

const accountSelector = async (req, res, next) => {
    const { userType, email, password } = req.body;

    try {
        let loginFunction;

        // Kullanıcı türüne göre giriş işlemi
        switch (userType) {
            case 'student':
                loginFunction = studentLogin;
                break;
            case 'employer':
                loginFunction = employerLogin;
                break;
            case 'lecturer':
                loginFunction = lecturerLogin;
                break;
            default:
                throw new ApiError('Geçersiz kullanıcı türü!', httpStatus.BAD_REQUEST);
        }

        const result = await loginFunction(req, res, next);
        res.status(httpStatus.OK).json(result);
    } catch (error) {
        if (error instanceof ApiError && error.statusCode === httpStatus.UNAUTHORIZED) {
            return next(new ApiError('Hatalı şifre!', httpStatus.UNAUTHORIZED));
        } else if (error instanceof ApiError && error.statusCode === httpStatus.BAD_REQUEST) {
            return next(new ApiError('Geçersiz kullanıcı türü!', httpStatus.BAD_REQUEST));
        } else {
            return next(new ApiError('Bir hata oluştu!', httpStatus.INTERNAL_SERVER_ERROR)); // Farklı kullanıcı seçilirse
        }
    }
};

module.exports = {
    accountSelector,
};
