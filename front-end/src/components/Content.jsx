import "../styles/content.css";
import formatDate from "../utils/formatDate";
import {
  getAllTodos,
  addTodo,
  deleteTodo,
  completeTodo,
  updateTodo,
} from "../api/todo.js";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorIcon } from "../components/icons/ErrorIcon.jsx";
import { DeleteTaskIcon } from "./icons/DeleteTaskIcon.jsx";
import { EditTaskIcon } from "./icons/EditTaskIcon.jsx";
import { SaveIcon } from "./icons/SaveIcon.jsx";
import { CancelIcon } from "./icons/CancelIcon.jsx";

function Content() {
  const [tasks, setTasks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getAllTodos();
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const deleteTask = async (id) => {
    try {
      await deleteTodo(id);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const today = new Date();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await addTodo(data);
      setTasks([...tasks, response.data]);
      reset();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  });

  const toggleComplete = async (id, currentStatus) => {
    try {
      await completeTodo(id, !currentStatus);
      setTasks(
        tasks.map((task) =>
          task._id === id ? { ...task, completed: !currentStatus } : task
        )
      );
    } catch (error) {
      console.error("Error toggling task completion:", error);
      setTasks(
        tasks.map((task) =>
          task._id === id ? { ...task, completed: currentStatus } : task
        )
      );
    }
  };

  const startEditing = (task) => {
    setEditingId(task._id);
    setEditText(task.task);
  };

  const saveEdit = async (id) => {
    if (!editText.trim()) {
      alert("La tarea no puede estar vacía");
      return;
    }

    setIsSaving(true);
    try {
      await updateTodo(id, { task: editText });
      setTasks(
        tasks.map((task) =>
          task._id === id ? { ...task, task: editText } : task
        )
      );
      setEditingId(null);
    } catch (error) {
      console.error("Error saving edit:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  return (
    <div className="container">
      <div className="content-header">
        <h1>Hoy</h1>
        <p>{formatDate(today.toLocaleDateString())}</p>
      </div>

      <div className="content-body">
        <div className="content-body-left">
          <h2>Tareas Favoritas</h2>
          <ul></ul>
        </div>

        <div className="content-body-right">
          <h2>Lista de Tareas</h2>
          <form onSubmit={onSubmit}>
            <div className="content-body-right-top">
              <input
                type="text"
                placeholder="Nueva Tarea"
                {...register("task", {
                  required: "Se requiere ingresar una Tarea!",
                })}
              />
              <input type="submit" value="Agregar" />
            </div>

            <div className="content-body-right-bottom">
              {errors.task && (
                <p className="error">
                  <ErrorIcon />
                  {errors.task.message}
                </p>
              )}
            </div>
          </form>
          <div className="tasks-container">
            {tasks.map((task) => {
              return (
                <div className="task" key={task._id}>
                  <div className="task-leftside">
                    <input
                      type="checkbox"
                      checked={task.completed || false}
                      onChange={() => toggleComplete(task._id, task.completed)}
                    />
                    {editingId === task._id ? (
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" && saveEdit(task._id)
                        }
                        onBlur={() => saveEdit(task._id)}
                        autoFocus
                      />
                    ) : (
                      <p
                        style={{
                          textDecoration: task.completed
                            ? "line-through"
                            : "none",
                          opacity: task.completed ? 0.7 : 1,
                        }}
                      >
                        {task.task}
                      </p>
                    )}
                  </div>
                  <div className="task-rightside">
                    {editingId === task._id ? (
                      <>
                        <button
                          onClick={() => saveEdit(task._id)}
                          aria-label="Guardar"
                          disabled={isSaving}
                        >
                          {isSaving ? "Guardando..." : <SaveIcon />}
                        </button>
                        <button
                          onClick={cancelEdit}
                          aria-label="Cancelar"
                          disabled={isSaving}
                        >
                          <CancelIcon />
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => startEditing(task)}
                        aria-label="Editar"
                      >
                        <EditTaskIcon />
                      </button>
                    )}
                    <button
                      onClick={() => deleteTask(task._id)}
                      aria-label="Eliminar"
                      disabled={editingId === task._id}
                    >
                      <DeleteTaskIcon />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Content;