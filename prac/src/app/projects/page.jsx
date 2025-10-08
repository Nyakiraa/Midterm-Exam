"use client";
import { useState, useEffect } from "react";

export default function ProjectListPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Temporary static data (simulate backend)
    const fakeProjects = [
      {
        id: 1,
        name: "Website Redesign",
        description: "Update the UI and add dark mode.",
        tasks: [
          { id: 101, title: "Redesign homepage" },
          { id: 102, title: "Add dark mode switch" },
        ],
      },
      {
        id: 2,
        name: "Mobile App Launch",
        description: "Prepare app for release on Play Store.",
        tasks: [
          { id: 201, title: "Create promo materials" },
          { id: 202, title: "Finalize app icons" },
        ],
      },
    ];

    setTimeout(() => {
      setProjects(fakeProjects);
      setLoading(false);
    }, 800);
  }, []);

  if (loading) return <div className="text-center p-6">Loading projects...</div>;
  if (error) return <div className="text-center text-red-600 p-6">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Project List</h1>

        {projects.length === 0 ? (
          <p className="text-center text-gray-500">No projects found.</p>
        ) : (
          <div className="space-y-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="border rounded-xl p-5 hover:shadow-md transition bg-gray-50"
              >
                <h2 className="text-xl font-semibold text-blue-700">{project.name}</h2>
                <p className="text-gray-600 mb-3">{project.description}</p>

                <h3 className="font-medium mb-2">Tasks:</h3

