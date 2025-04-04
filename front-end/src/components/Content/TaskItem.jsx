import { useState } from "react";
import { completeTodo, deleteTodo } from "../../api/todo.js";
import { DeleteTaskIcon } from "../icons/DeleteTaskIcon";
import { EditTaskIcon } from "../icons/EditTaskIcon";
import EditTaskForm from "./EditTaskForm";
import "../../styles/content.css";

export default function TaskItem({ task, editingId, setEditingId, setTasks }) {
  const [isSaving, setIsSaving] = useState(false);

  const toggleComplete = async (id, currentStatus) => {
    try {
      await completeTodo(id, !currentStatus);
      setTasks(tasks => tasks.map(t => t._id === id ? { ...t, completed: !currentStatus } : t));
    } catch (error) {
      console.error("Error toggling task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await deleteTodo(id);
      setTasks(tasks => tasks.filter(t => t._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="task">
      <div className="task-leftside">
        <input
          type="checkbox"
          checked={task.completed || false}
          onChange={() => toggleComplete(task._id, task.completed)}
        />
        
        {editingId === task._id ? (
          <EditTaskForm
            task={task}
            setEditingId={setEditingId}
            setTasks={setTasks}
            isSaving={isSaving}
            setIsSaving={setIsSaving}
          />
        ) : (
          <p style={{
            textDecoration: task.completed ? "line-through" : "none",
            opacity: task.completed ? 0.7 : 1,
          }}>
            {task.task}
          </p>
        )}
      </div>
      
      <div className="task-rightside">
        {editingId !== task._id && (
          <>
            <button onClick={() => setEditingId(task._id)} aria-label="Editar">
              <EditTaskIcon />
            </button>
            <button onClick={() => deleteTask(task._id)} aria-label="Eliminar">
              <DeleteTaskIcon />
            </button>
          </>
        )}
      </div>
    </div>
  );
}