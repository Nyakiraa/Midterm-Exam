"use client";

import { useState } from "react";

export default function TaskListPage() {
  // Temporary sample data
  const [tasks, setTasks] = useState([
    { id: 1, title: "Finish frontend UI", description: "Complete task creation form", dueDate: "2025-10-10" },
    { id: 2, title: "Connect backend", description: "Link frontend to API", dueDate: "2025-10-12" },
  ]);

  const [editingTask, setEditingTask] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");

  // Delete a task
  const handleDelete = (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  // Start editing
  const handleEdit = (task) => {
    setEditingTask(task);
    setUpdatedTitle(task.title);
  };

  // Save edited task
  const handleSave = () => {
    setTasks(
      tasks.map((t) =>
        t.id === editingTask.id ? { ...t, title: updatedTitle } : t
      )
    );
    setEditingTask(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Task List
        </h1>

        {tasks.length === 0 ? (
          <p className="text-center text-gray-500">No tasks yet.</p>
        ) : (
          <ul className="space-y-4">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="border rounded-lg p-4 flex justify-between items-center"
              >
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {editingTask?.id === task.id ? (
                      <input
                        type="text"
                        value={updatedTitle}
                        onChange={(e) => setUpdatedTitle(e.target.value)}
                        className="border px-2 py-1 rounded"
                      />
                    ) : (
                      task.title
                    )}
                  </h2>
                  <p className="text-gray-600 text-sm">{task.description}</p>
                  <p className="text-gray-500 text-xs">
                    Due: {task.dueDate}
                  </p>
                </div>

                <div className="flex space-x-2">
                  {editingTask?.id === task.id ? (
                    <button
                      onClick={handleSave}
                      className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(task)}
                      className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
