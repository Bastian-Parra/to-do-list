import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getAllTodos } from "../../api/todo.js";
import TaskList from "./TaskList.jsx";
import TaskForm from "./TaskForm.jsx";
import formatDate from "../../utils/formatDate.js";
import Footer from "../Footer.jsx";
import "../../styles/content.css";

function Index() {
  const [tasks, setTasks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

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

  const today = new Date();

  return (
    <div className="container">
      <div className="content-header">
        <h1>Hoy</h1>
        <p>{formatDate(today.toLocaleDateString())}</p>
      </div>

      <div className="content-body">

        <div className="content-body-right">
          <h2>Lista de Tareas</h2>
          <TaskForm 
            register={register}
            handleSubmit={handleSubmit}
            errors={errors}
            reset={reset}
            setTasks={setTasks}
            tasks={tasks}
          />
          
          <TaskList 
            tasks={tasks}
            editingId={editingId}
            setEditingId={setEditingId}
            setTasks={setTasks}
          />
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Index;