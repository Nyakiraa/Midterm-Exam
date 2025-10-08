const API_URL = "http://localhost:4000/api"; // Change if your backend URL differs

// --- localStorage-backed mock helpers (used when backend is unreachable) ---
function _loadMock() {
  try {
    const raw = localStorage.getItem("mockTasks");
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function _saveMock(list) {
  try {
    localStorage.setItem("mockTasks", JSON.stringify(list));
  } catch (e) {
    // ignore
  }
}

function _nextId(list) {
  return list.reduce((max, t) => Math.max(max, t.id || 0), 0) + 1;
}

// Try a fetch, otherwise fallback to mock operations so the frontend remains usable offline
export async function getTasks() {
  try {
    const res = await fetch(`${API_URL}/tasks`);
    if (!res.ok) throw new Error("Failed to fetch tasks");
    return res.json();
  } catch (err) {
    // fallback to mock stored in localStorage
    return _loadMock();
  }
}

export async function createTask(taskData) {
  try {
    const res = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData),
    });
    if (!res.ok) throw new Error("Failed to create task");
    return res.json();
  } catch (err) {
    // fallback - create a mock task locally
    const list = _loadMock();
    const newTask = { ...taskData, id: _nextId(list) };
    list.push(newTask);
    _saveMock(list);
    return newTask;
  }
}

export async function deleteTask(id) {
  try {
    const res = await fetch(`${API_URL}/tasks/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete task");
    return res.json();
  } catch (err) {
    // fallback - remove from mock
    const list = _loadMock().filter((t) => t.id !== id);
    _saveMock(list);
    return { ok: true };
  }
}

export async function updateTask(id, updates) {
  try {
    const res = await fetch(`${API_URL}/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error("Failed to update task");
    return res.json();
  } catch (err) {
    // fallback - update in mock
    const list = _loadMock();
    const idx = list.findIndex((t) => t.id === id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...updates };
      _saveMock(list);
      return list[idx];
    }
    throw err;
  }
}
