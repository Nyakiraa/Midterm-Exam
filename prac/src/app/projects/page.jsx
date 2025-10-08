"use client";
import { useState, useEffect } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorMessage from "../../components/ErrorMessage";

export default function ProjectListPage() {
  const [projects, setProjects] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("http://localhost:4000/api/projects");
        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();
        setProjects(data);
        setFiltered(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load projects.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // 🔍 Filter logic
  useEffect(() => {
    const filteredList = projects.filter(
      (project) =>
        project.name.toLowerCase().includes(search.toLowerCase()) ||
        project.tasks?.some((task) =>
          task.title.toLowerCase().includes(search.toLowerCase())
        )
    );
    setFiltered(filteredList);
  }, [search, projects]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Project List</h1>

        {/* 🔍 Search bar */}
        <input
          type="text"
          placeholder="Search projects or tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-6 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {filtered.length === 0 ? (
          <p className="text-center text-gray-500">No projects found.</p>
        ) : (
          <div className="space-y-6">
            {filtered.map((project) => (
              <div
                key={project.id}
                className="border rounded-xl p-5 hover:shadow-md transition bg-gray-50"
              >
                <h2 className="text-xl font-semibold text-blue-700">
                  {project.name}
                </h2>
                <p className="text-gray-600 mb-3">{project.description}</p>

                {project.tasks?.length > 0 ? (
                  <>
                    <h3 className="font-medium mb-2">Tasks:</h3>
                    <ul className="list-disc list-inside text-gray-700">
                      {project.tasks.map((task) => (
                        <li key={task.id}>{task.title}</li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <p className="text-gray-500">No tasks yet for this project.</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
