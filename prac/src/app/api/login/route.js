const { login } = require('../../../controllers/authController');
const { success, error } = require('../../../lib/response');

/**
 * POST /api/login
 */
module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return error(res, 'Method not allowed', 405);
  }

  try {
    const result = await login(req.body);
    return success(res, result, 200);
  } catch (err) {
    const status = err.status || 500;
    return error(res, err.message, status, err.errors || null);
  }
};
