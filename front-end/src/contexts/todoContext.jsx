import { createContext, useContext, useEffect, useState } from "react";
import { getAllTodos, deleteTodo, updateTodo, addTodo } from "../api/todo.js";

const todoContext = createContext();

export const useTodos = () => {
  const context = useContext(todoContext);

  if (!context) {
    throw new Error("useTodos must be used within a TodoProvider");
  }

  return context;
};

export function TodosProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState([]);

  const getAllTasks = async () => {
    try {
      const response = await getAllTodos();
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addNewTask = async (newTask) => {
    try {
      await addTodo(newTask);
      setTask(newTask);
      getAllTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await deleteTodo(id);
      getAllTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const updateTask = async (id, updatedTask) => {
    try {
      await updateTodo(id, updatedTask);
      getAllTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  return (
    <todoContext.Provider value={{ tasks, addNewTask, deleteTask, updateTask }}>
      {children}
    </todoContext.Provider>
  );
}
