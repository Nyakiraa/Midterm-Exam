const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { validateRegistration } = require('../validators/authValidator');

/**
 * Register a new user.
 * @param {{username: string, password: string, role?: string}} param0
 * @returns {Promise<Object>} Created user (without password)
 * @throws {Object} Throws an object with status and errors/message on failure
 */
async function registerUser({ username, password, role = 'user' } = {}) {
  const { valid, errors } = validateRegistration({ username, password });
  if (!valid) {
    const err = new Error('Validation failed');
    err.status = 400;
    err.errors = errors;
    throw err;
  }

  // check existing username
  const existing = await User.findOne({ username });
  if (existing) {
    const err = new Error('Username already exists');
    err.status = 409;
    throw err;
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);

  const user = new User({ username, password: hashed, role });
  await user.save();

  return user.toJSON();
}

module.exports = { registerUser };
