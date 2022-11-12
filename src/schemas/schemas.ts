import Joi from "joi";

const userSchema = Joi.object({
    name: Joi.string().required().min(3),
    email: Joi.string().email({ minDomainSegments: 2, tlds: {allow: ['com', 'net', 'br']}}).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    confirmPassword: Joi.ref('password')
});

const loginSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: {allow: ['com', 'net', 'br']}}).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
});

const movieSchema = Joi.object({
    name: Joi.string().required(),
    genre: Joi.string().required(),
    plataform: Joi.string().required()
});

const reviewSchema = Joi.object({
    comments: Joi.string(),
    rating: Joi.number().min(1).max(10),
    status: Joi.string().required()
});

export {userSchema, loginSchema, movieSchema, reviewSchema};