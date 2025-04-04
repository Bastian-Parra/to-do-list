import { addTodo } from "../../api/todo.js";
import { ErrorIcon } from "../icons/ErrorIcon";
import "../../styles/content.css";


export default function TaskForm({ register, handleSubmit, errors, reset, setTasks, tasks }) {
  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await addTodo(data);
      setTasks([...tasks, response.data]);
      reset();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  });

  return (
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
  );
}