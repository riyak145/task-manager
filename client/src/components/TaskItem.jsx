const TaskItem = ({ task, onComplete, onDelete, onEdit }) => {

  const formatDate = (dateStr) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const isOverdue = (dateStr) => {
    if (!dateStr) return false;
    const due = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return due < today && !task.completed;
  };

  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>

      <div className="task-info">
        <div className="task-top">
          <h3 className="task-title">{task.title}</h3>
          <span className="task-category">{task.category || "General"}</span>
        </div>

        {task.description && (
          <p className="task-description">{task.description}</p>
        )}

        <div className="task-bottom">
          <span className={`task-status ${task.completed ? "status-done" : "status-pending"}`}>
            {task.completed ? "Completed" : "Pending"}
          </span>

          {task.dueDate && (
            <span className={`task-due ${isOverdue(task.dueDate) ? "overdue" : ""}`}>
              📅 {formatDate(task.dueDate)}
              {isOverdue(task.dueDate) && " — Overdue!"}
            </span>
          )}
        </div>
      </div>

      <div className="task-actions">
        {!task.completed && (
          <button className="btn-complete" onClick={() => onComplete(task._id)}>
            Done
          </button>
        )}
        {!task.completed && (
          <button className="btn-edit" onClick={() => onEdit(task)}>
            Edit
          </button>
        )}
        <button className="btn-delete" onClick={() => onDelete(task._id)}>
          Delete
        </button>
      </div>

    </div>
  );
};

export default TaskItem;