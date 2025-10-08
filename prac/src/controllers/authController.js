const { registerUser, authenticateUser } = require('../app/services/userService');

async function register(reqBody) {
  const { username, password, role } = reqBody || {};
  const user = await registerUser({ username, password, role });
  return user;
}

async function login(reqBody) {
  const { username, password } = reqBody || {};
  const result = await authenticateUser({ username, password });
  return result;
}

module.exports = { register, login };
