import axios from "axios";

const API = "http://localhost:5000/tasks";

// Get all tasks
export const getTasks = async () => {
  const response = await axios.get(API);
  return response.data;
};

// Create a new task
export const createTask = async (taskData) => {
  const response = await axios.post(API, taskData);
  return response.data;
};

// Update a task
export const updateTask = async (id, taskData) => {
  const response = await axios.put(`${API}/${id}`, taskData);
  return response.data;
};

// Mark task as completed
export const markComplete = async (id) => {
  const response = await axios.patch(`${API}/${id}/complete`);
  return response.data;
};

// Delete a task
export const deleteTask = async (id) => {
  const response = await axios.delete(`${API}/${id}`);
  return response.data;
};