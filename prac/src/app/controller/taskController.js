// src/app/controller/taskController.js
// Controller for Task CRUD operations

const taskService = require('../services/taskService');
const { validateTask, validateTaskUpdate } = require('../validators/taskValidator');

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { error } = validateTask(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const task = await taskService.createTask(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await taskService.getTasks();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single task by ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await taskService.getTaskById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a task by ID
exports.updateTask = async (req, res) => {
  try {
    const { error } = validateTaskUpdate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const updatedTask = await taskService.updateTask(req.params.id, req.body);
    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a task by ID
exports.deleteTask = async (req, res) => {
  try {
    const deleted = await taskService.deleteTask(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
