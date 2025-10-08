import Task from "@/models/Task";

export async function createTask({ title, description = "", createdBy }) {
    const task = new Task({ title, description, createdBy });
    await task.save();
    console.log("Task created", { id: task._id.toString(), title: task.title });
    return serialize(task);
}

export async function listTasks() {
    const tasks = await Task.find({}).sort({ createdAt: -1 });
    return tasks.map(serialize);
}

export async function updateTask(id, updates) {
    const updated = await Task.findByIdAndUpdate(id, updates, { new: true });
    if (!updated) {
        const err = new Error("task not found");
        err.status = 404;
        throw err;
    }
    return serialize(updated);
}

export async function deleteTask(id) {
    const res = await Task.findByIdAndDelete(id);
    if (!res) {
        const err = new Error("task not found");
        err.status = 404;
        throw err;
    }
    return { id };
}

function serialize(t) {
    return {
        id: t._id.toString(),
        title: t.title,
        description: t.description,
        createdBy: t.createdBy?.toString?.() || t.createdBy,
        createdAt: t.createdAt,
        updatedAt: t.updatedAt
    };
}