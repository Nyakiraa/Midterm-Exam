const { login } = require('../../../controllers/authController');

/**
 * POST /api/login
 */
module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const result = await login(req.body);
    res.status(200).json({ data: result });
  } catch (err) {
    const status = err.status || 500;
    res.status(status).json({ error: err.message, errors: err.errors || null });
  }
};
