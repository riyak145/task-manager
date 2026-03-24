import { useState, useEffect } from "react";

const DEFAULT_CATEGORIES = ["General", "Work", "Personal", "Shopping", "Health"];

const TaskForm = ({ onSubmit, editingTask, onCancel }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("General");
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [newCategory, setNewCategory] = useState("");
  const [error, setError] = useState("");
  const [categoryError, setCategoryError] = useState("");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description || "");
      setDueDate(
        editingTask.dueDate
          ? new Date(editingTask.dueDate).toISOString().split("T")[0]
          : ""
      );
      const editCat = editingTask.category || "General";
      setCategories((prev) =>
        prev.includes(editCat) ? prev : [...prev, editCat]
      );
      setCategory(editCat);
    } else {
      setTitle("");
      setDescription("");
      setDueDate("");
      setCategory("General");
      setNewCategory("");
      setError("");
      setCategoryError("");
    }
  }, [editingTask]);

  const handleAddCategory = () => {
    const trimmed = newCategory.trim();
    if (!trimmed) {
      setCategoryError("Please type a category name");
      return;
    }
    if (categories.includes(trimmed)) {
      setCategoryError("Category already exists");
      return;
    }
    setCategories((prev) => [...prev, trimmed]);
    setCategory(trimmed);
    setNewCategory("");
    setCategoryError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting with category:", category); // debug

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    setError("");
    onSubmit({ title, description, dueDate, category });

    setTitle("");
    setDescription("");
    setDueDate("");
    setCategory("General");
    setNewCategory("");
    setCategoryError("");
  };

  return (
    <div className="task-form-container">
      <h2>{editingTask ? "Edit Task" : "Add New Task"}</h2>

      {error && <p className="form-error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title *</label>
          <input
            type="text"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            placeholder="Enter task description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              value={category}
              onChange={(e) => {
                console.log("Category changed to:", e.target.value); // debug
                setCategory(e.target.value);
              }}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="add-category-row">
          <input
            type="text"
            placeholder="New category name..."
            value={newCategory}
            onChange={(e) => {
              setNewCategory(e.target.value);
              setCategoryError("");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddCategory();
              }
            }}
          />
          <button
            type="button"
            className="btn-add-category"
            onClick={handleAddCategory}
          >
            + Add Category
          </button>
        </div>

        {categoryError && <p className="form-error">{categoryError}</p>}

        <div className="form-buttons">
          <button type="submit" className="btn-primary">
            {editingTask ? "Update Task" : "Add Task"}
          </button>
          {editingTask && (
            <button
              type="button"
              className="btn-secondary"
              onClick={onCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TaskForm;