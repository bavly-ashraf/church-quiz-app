const Joi = require('joi');
const AppError = require('./AppError');

const signupSchema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),

    confirm_password: Joi.ref('password'),

    birthday: Joi.date(),

    mobile: Joi.string().pattern(new RegExp('^(\\+201|01|00201)[0-2,5]{1}[0-9]{8}')),

    instance_id: Joi.string(),

    country_id: Joi.string(),

    city_id: Joi.string()
});

const loginSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});


const loginValidation = (req, res, next) => {
    const { error } = loginSchema.validate(req.body, { abortEarly: false });
    if (error) return next(new AppError(400, error.message, error.details));
    next();
}
const signupValidation = (req, res, next) => {
    const { error } = signupSchema.validate(req.body, { abortEarly: false });
    if (error) return next(new AppError(400, error.message, error.details));
    next();
}

module.exports = { loginValidation, signupValidation }
