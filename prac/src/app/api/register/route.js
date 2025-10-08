const { register } = require('../../../controllers/authController');

/**
 * POST /api/register
 */
module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const user = await register(req.body);
    res.status(201).json({ data: user });
  } catch (err) {
    const status = err.status || 500;
    res.status(status).json({ error: err.message, errors: err.errors || null });
  }
};
