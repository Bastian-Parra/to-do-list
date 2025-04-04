import express from 'express'
import todosController from '../controllers/todosController.js'
import { Todo } from '../models/Todo.js'
const Router = express.Router()

Router.get('/getAllTodos', todosController.getAllTodos)
Router.post('/addTodo', todosController.createTodo)
Router.put('/updateTodo/:id', todosController.updateTodo)
Router.delete('/deleteTodo/:id', todosController.deleteTodo)
Router.patch('/completeTodo/:id', async (req, res) => {
    try {
        const { _id } = req.params
        const { completed } = req.body
        
        const updatedTodo = await Todo.findByIdAndUpdate(
            _id,
            { completed },
            { new: true}
        )

        res.json(updatedTodo)
    } catch (error) {
        res.status(500).json({ message: 'Error completing todo' })
    }
})

export default Router
