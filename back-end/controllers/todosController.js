import todoServices from "../services/todosService.js"

const TodoController = {

    async getAllTodos(req, res) {
        try {
            const todos = await todoServices.getAllTodos()
            res.status(200).json(todos)
        } catch (error) {
            res.status(500).json({ message: "Error fetching todos", error })
        }
    },

    async createTodo(req, res) {
        try {
            const newTodo = await todoServices.createTodo(req.body)
            res.status(201).json(newTodo)
        } catch (error) {
            res.status(500).json({ message: "Error creating todo", error })
        }
    },

    async updateTodo(req, res) {
        try {
            const updatedTodo = await todoServices.updateTodo(req.params.id, req.body)
            if (!updatedTodo) {
                return res.status(404).json({ message: "Todo not found" })
            }
            res.status(200).json(updatedTodo)
        } catch (error) {
            res.status(500).json({ message: "Error updating todo", error })
        }
    },

    async deleteTodo(req, res) {
        try {
            const deletedTodo = await todoServices.deleteTodo(req.params.id)
            if (!deletedTodo) {
                return res.status(404).json({ message: "Todo not found" })
            }
            res.status(200).json({ message: "Todo deleted successfully" })
        } catch (error) {
            res.status(500).json({ message: "Error deleting todo", error })
        }
    }
}

export default TodoController