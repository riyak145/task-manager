import { useState, useEffect } from "react";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  markComplete,
} from "./services/taskService";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch all tasks on load
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  // Create or Update task
  const handleSubmit = async (taskData) => {
    try {
      if (editingTask) {
        // Update existing task
        const updated = await updateTask(editingTask._id, taskData);
        setTasks(tasks.map((t) => (t._id === updated._id ? updated : t)));
        setEditingTask(null);
      } else {
        // Create new task
       const newTask = await createTask(taskData);
        setTasks([newTask, ...tasks]);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  // Mark task as complete
  const handleComplete = async (id) => {
    try {
      const updated = await markComplete(id);
      setTasks(tasks.map((t) => (t._id === updated._id ? updated : t)));
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  // Delete task
  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      setError("Failed to delete task");
    }
  };

  // Set task to edit
  const handleEdit = (task) => {
    setEditingTask(task);
  };

  // Cancel editing
  const handleCancel = () => {
    setEditingTask(null);
  };

 return (
    <div className="app">
      <h1> Task Manager</h1>
      <p className="app-subtitle">Stay organized, stay productive!</p>

      {error && (
        <div className="error-msg">
          {error}
          <button onClick={() => setError("")}>✕</button>
        </div>
      )}

      <TaskForm
        onSubmit={handleSubmit}
        editingTask={editingTask}
        onCancel={handleCancel}
      />

      {loading ? (
        <p className="loading">Loading tasks...</p>
      ) : (
        <TaskList
          tasks={tasks}
          onComplete={handleComplete}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}
    </div>
  );
};

export default App;