import Project from "@/models/Project";
import Task from "@/models/Task";

export async function createProject({ name, description = "", createdBy }) {
    const project = new Project({ name, description, createdBy });
    await project.save();
    console.log("Project created", { id: project._id.toString(), name: project.name });
    return serialize(project);
}

export async function listProjectsWithTasks() {
    const projects = await Project.find({}).sort({ createdAt: -1 });
    const projectIds = projects.map(p => p._id);
    const tasks = await Task.find({}).lean();
    const projectIdToTasks = {};
    for (const p of projects) projectIdToTasks[p._id.toString()] = [];
    for (const t of tasks) {
        const pid = t.projectId?.toString?.();
        if (!pid) continue;
        if (!projectIdToTasks[pid]) projectIdToTasks[pid] = [];
        projectIdToTasks[pid].push(taskSerialize(t));
    }
    return projects.map(p => ({ ...serialize(p), tasks: projectIdToTasks[p._id.toString()] || [] }));
}

function serialize(p) {
    return {
        id: p._id.toString(),
        name: p.name,
        description: p.description,
        createdBy: p.createdBy?.toString?.() || p.createdBy,
        createdAt: p.createdAt,
        updatedAt: p.updatedAt
    };
}

function taskSerialize(t) {
    return {
        id: t._id.toString(),
        title: t.title,
        description: t.description,
        createdBy: t.createdBy?.toString?.() || t.createdBy,
        createdAt: t.createdAt,
        updatedAt: t.updatedAt
    };
}
