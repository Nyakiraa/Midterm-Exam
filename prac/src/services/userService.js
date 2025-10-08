const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { validateRegistration, validateLogin } = require('../../validators/authValidator');

const JWT_SECRET = process.env.JWT_SECRET || 'please-change-this-secret';

// register a new user
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

// authenticate a user and return a JWT + user (without password)
async function authenticateUser({ username, password } = {}) {
	const { valid, errors } = validateLogin({ username, password });
	if (!valid) {
		const err = new Error('Validation failed');
		err.status = 400;
		err.errors = errors;
		throw err;
	}

	const user = await User.findOne({ username }).exec();
	if (!user) {
		const err = new Error('Invalid credentials');
		err.status = 401;
		throw err;
	}

	const match = bcrypt.compareSync(password, user.password);
	if (!match) {
		const err = new Error('Invalid credentials');
		err.status = 401;
		throw err;
	}

	const payload = { id: user.id, username: user.username, role: user.role };
	const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

	return { token, user: user.toJSON() };
}

module.exports = { registerUser, authenticateUser };
