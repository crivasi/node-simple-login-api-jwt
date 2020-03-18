const Joi = require('@hapi/joi');

const registerUserValidation = (data) => {
	const validationUserSchema = Joi.object({
		name: Joi.string().min(2).required(),
		email: Joi.string().min(6).required().email(),
		password: Joi.string().min(6).required()
	});
	return validationUserSchema.validate(data);
};

const loginUserValidation = (data) => {
	const validationUserSchema = Joi.object({
		email: Joi.string().min(6).required().email(),
		password: Joi.string().min(6).required()
	});
	return validationUserSchema.validate(data);
};

module.exports.registerValidation = registerUserValidation;
module.exports.loginValidation = loginUserValidation;
