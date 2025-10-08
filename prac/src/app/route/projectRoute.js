// src/app/route/projectRoute.js
const express = require('express');
const router = express.Router();
const projController = require('../controller/projController');

// POST /api/projects - Create a new project
router.post('/api/projects', projController.createProject);

// GET /api/projects - Get all projects
router.get('/api/projects', projController.getProjects);

module.exports = router;
