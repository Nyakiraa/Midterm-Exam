"use client";

import { useState } from "react";
import { createTask } from "@/utils/api";

export default function NewTaskPage() {
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!task.title || !task.description || !task.dueDate) {
      setMessage("All fields are required!");
      return;
    }

    try {
      const newTask = await createTask(task);
      console.log("Created task:", newTask);
      setMessage("✅ Task created successfully!");
      setTask({ title: "", description: "", dueDate: "" });
    } catch (err) {
      console.error(err);
      setMessage(`❌ Failed to create task. ${err?.message || ""}`);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Create New Task
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={task.title}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1 focus:ring focus:ring-blue-300 bg-white text-gray-900"
              placeholder="Enter task title"
            />
          </div>

          <div>
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={task.description}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1 focus:ring focus:ring-blue-300 bg-white text-gray-900"
              placeholder="Enter task description"
              rows="3"
            />
          </div>

          <div>
            <label className="block text-gray-700">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={task.dueDate}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1 focus:ring focus:ring-blue-300 bg-white text-gray-900"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Create Task
          </button>
        </form>

        {message && (
          <p className="text-green-600 text-center mt-4">{message}</p>
        )}
      </div>
    </div>
  );
}

