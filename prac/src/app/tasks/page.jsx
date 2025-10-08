"use client";

import { useState, useEffect } from "react";
import { getTasks, deleteTask, updateTask } from "@/utils/api";

export default function TaskListPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editingTask, setEditingTask] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");

  useEffect(() => {
    async function fetchTasks() {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (err) {
        setError("Failed to load tasks");
      } finally {
        setLoading(false);
      }
    }

    fetchTasks();
  }, []);

  // Delete a task (optimistic)
  const handleDelete = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return;

    const prev = tasks;
    setTasks(tasks.filter((task) => task.id !== id));
    try {
      await deleteTask(id);
    } catch (err) {
      console.error(err);
      setError("Failed to delete task");
      setTasks(prev);
    }
  };

  // Start editing
  const handleEdit = (task) => {
    setEditingTask(task);
    setUpdatedTitle(task.title);
  };

  // Save edited task
  const handleSave = async () => {
    if (!editingTask) return;
    const prev = tasks;
    const updated = tasks.map((t) =>
      t.id === editingTask.id ? { ...t, title: updatedTitle } : t
    );
    setTasks(updated);
    setEditingTask(null);
    try {
      await updateTask(editingTask.id, { title: updatedTitle });
    } catch (err) {
      console.error(err);
      setError("Failed to update task");
      setTasks(prev);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Task List
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading tasks...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : tasks.length === 0 ? (
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
