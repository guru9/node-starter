const validator = require('validator');
const isEmpty = require('./is-empty');

const validateRegisterInput = data => {
	//Initialize error list be empty
	let errors = {};

	data.name = !isEmpty(data.name) ? data.name : '';
	data.email = !isEmpty(data.email) ? data.email : '';
	data.passport = !isEmpty(data.passport) ? data.passport : '';

	//Name consists of atleast 3 characters and doesn't exceeds 30 characters
	if (!validator.isLength(data.name, { min: 3, max: 30 })) {
		errors.name = 'Name must be between 3 and 30 characters';
	}

	//Validate for empty name
	if (validator.isEmpty(data.name)) {
		errors.name = 'Name field is required';
	}

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

module.exports = validateRegisterInput;
