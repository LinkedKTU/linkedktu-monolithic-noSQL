const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const eventEmitter = require('./event-emitter.event');

module.exports = () => {
    eventEmitter.on('send_email', (emailData) => {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        if (emailData.template) {
            transporter.use(
                'compile',
                hbs({
                    viewEngine: {
                        extName: '.hbs',
                        partialsDir: 'templates/email',
                        defaultLayout: false,
                    },
                    viewPath: 'templates/email',
                    extName: '.hbs',
                })
            );
        }

        transporter.sendMail({
            from: process.env.EMAIL_USER,
            ...emailData,
        });
    });
};


