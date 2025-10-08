// src/app/controller/projController.js
// Controller for Project CRUD operations

const projService = require('../services/projService');
// You may want to add project validators if available

// Create a new project
exports.createProject = async (req, res) => {
  try {
    // Add validation if you have a validator
    const project = await projService.createProject(req.body);
    res.status(201).json({ success: true, data: project });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get all projects
exports.getProjects = async (req, res) => {
  try {
    if (typeof projService.listProjectsWithTasks === 'function') {
      const projects = await projService.listProjectsWithTasks();
      return res.status(200).json({ success: true, data: projects });
    } else {
      const projects = await projService.getProjects();
      return res.status(200).json({ success: true, data: projects });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get a single project by ID
exports.getProjectById = async (req, res) => {
  try {
    const project = await projService.getProjectById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }
    res.status(200).json({ success: true, data: project });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Update a project by ID
exports.updateProject = async (req, res) => {
  try {
    // Add validation if you have a validator
    const updatedProject = await projService.updateProject(req.params.id, req.body);
    if (!updatedProject) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }
    res.status(200).json({ success: true, data: updatedProject });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Delete a project by ID
exports.deleteProject = async (req, res) => {
  try {
    const deleted = await projService.deleteProject(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }
    res.status(200).json({ success: true, message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
