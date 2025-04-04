import { Todo } from "../models/Todo.js";

const TodoService = {
    getAllTodos: async () => {
        return await Todo.find({});
    },

    createTodo: async (todoData) => {
        const todo = new Todo(todoData);
        return await todo.save();
    },

    updateTodo: async (id, todoData) => {
        return await Todo.findByIdAndUpdate(id, todoData, { new: true });
    },

    deleteTodo: async (id) => {
        return await Todo.findByIdAndDelete(id);
    }
}

export default TodoService;