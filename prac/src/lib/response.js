function success(res, data, status = 200) {
  res.status(status).json({ success: true, data });
}

function error(res, message, status = 500, details = null) {
  res.status(status).json({ success: false, error: message, details });
}

module.exports = { success, error };
