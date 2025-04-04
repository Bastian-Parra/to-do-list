import TaskItem from "./TaskItem";
import "../../styles/content.css"

export default function TaskList({ tasks, editingId, setEditingId, setTasks }) {
  return (
    <div className="tasks-container">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          editingId={editingId}
          setEditingId={setEditingId}
          setTasks={setTasks}
        />
      ))}
    </div>
  );
}