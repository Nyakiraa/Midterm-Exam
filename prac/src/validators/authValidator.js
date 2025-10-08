function validateRegistration(data) {
  const errors = {};
  if (!data || typeof data !== 'object') {
    errors.general = 'Invalid input';
    return { valid: false, errors };
  }

  const username = data.username ? String(data.username).trim() : '';
  const password = data.password ? String(data.password) : '';

  if (!username) {
    errors.username = 'Username is required';
  }

  if (!password) {
    errors.password = 'Password is required';
  } else if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  return { valid: Object.keys(errors).length === 0, errors };
}

function validateLogin(data) {
  return validateRegistration(data);
}

module.exports = { validateRegistration, validateLogin };
 