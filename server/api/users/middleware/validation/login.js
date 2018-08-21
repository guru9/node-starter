const validator = require('validator');
const isEmpty = require('./is-empty');

const validateLoginInput = data => {
	//Initialize error list be empty
	let errors = {};

	data.email = !isEmpty(data.email) ? data.email : '';
	data.passport = !isEmpty(data.passport) ? data.passport : '';

	//Validate entered email
	if (!validator.isEmail(data.email)) {
		errors.email = 'Email is invalid';
	}

	//Validate entered password
	if (!validator.isLength(data.password, { min: 6, max: 30 })) {
		errors.password = 'Password must be at least 6 characters';
	}

	//Validate for empty email
	if (validator.isEmpty(data.email)) {
		errors.email = 'Email field is required';
	}

	//Validate for empty password
	if (validator.isEmpty(data.password)) {
		errors.password = 'Password field is required';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};

module.exports = validateLoginInput;
