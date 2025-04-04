import { useState } from "react";
import { updateTodo } from "../../api/todo.js";
import { SaveIcon } from "../icons/SaveIcon";
import { CancelIcon } from "../icons/CancelIcon";
import "../../styles/content.css";

export default function EditTaskForm({ task, setEditingId, setTasks, isSaving, setIsSaving }) {
  const [editText, setEditText] = useState(task.task);

  const saveEdit = async (id) => {
    if (!editText.trim()) {
      alert("La tarea no puede estar vacía");
      return;
    }

    setIsSaving(true);
    try {
      await updateTodo(id, { task: editText });
      setTasks(tasks => tasks.map(t => t._id === id ? { ...t, task: editText } : t));
      setEditingId(null);
    } catch (error) {
      console.error("Error saving edit:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <input
        type="text"
        value={editText}
        onChange={(e) => setEditText(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && saveEdit(task._id)}
        onBlur={() => saveEdit(task._id)}
        autoFocus
      />
      <button onClick={() => saveEdit(task._id)} disabled={isSaving}>
        {isSaving ? "Guardando..." : <SaveIcon />}
      </button>
      <button onClick={() => setEditingId(null)} disabled={isSaving}>
        <CancelIcon />
      </button>
    </>
  );
}