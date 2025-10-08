const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { validateRegistration } = require('../validators/authValidator');

    //register a new user
async function registerUser({ username, password, role = 'user' } = {}) {
	const { valid, errors } = validateRegistration({ username, password });
	if (!valid) {
		const err = new Error('Validation failed');
		err.status = 400;
		err.errors = errors;
		throw err;
	}

	// check existing username
	const existing = await User.findOne({ username }).exec();
	if (existing) {
		const err = new Error('Username already exists');
		err.status = 409;
		throw err;
	}

	// hash password 
	const salt = bcrypt.genSaltSync(10);
	const hashed = bcrypt.hashSync(password, salt);

	const user = new User({ username, password: hashed, role });
	const saved = await user.save();

	// UserSchema.toJSON removes password and maps _id -> id
	return saved.toJSON();
}

module.exports = { registerUser };
