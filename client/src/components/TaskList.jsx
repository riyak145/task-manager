import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onComplete, onDelete, onEdit }) => {
  if (tasks.length === 0) {
    return (
      <div className="no-tasks">
        <p>No tasks yet. Add your first task above!</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      <h2>All Tasks ({tasks.length})</h2>
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onComplete={onComplete}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default TaskList;