// src/app/api/tasks/route.js
const express = require('express');
const router = express.Router();
const taskController = require('../controller/taskController');

// POST /api/tasks - Create a new task
router.post('/', taskController.createTask);

// GET /api/tasks - Get all tasks
router.get('/', taskController.getTasks);

// PUT /api/tasks/:id - Update a task by ID
router.put('/:id', taskController.updateTask);

// DELETE /api/tasks/:id - Delete a task by ID
router.delete('/:id', taskController.deleteTask);

module.exports = router;
