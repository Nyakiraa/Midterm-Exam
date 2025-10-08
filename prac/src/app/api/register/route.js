const { register } = require('../../../controllers/authController');
const { success, error } = require('../../../lib/response');

/**
 * POST /api/register
 */
module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return error(res, 'Method not allowed', 405);
  }

  try {
    const user = await register(req.body);
    return success(res, user, 201);
  } catch (err) {
    const status = err.status || 500;
    return error(res, err.message, status, err.errors || null);
  }
};
