import axios from '../configs/axios.js'

export const getAllTodos = () => axios.get('/api/getAllTodos')
export const addTodo = (todo) => axios.post('/api/addTodo', todo)
export const updateTodo = (_id, todo) => axios.put(`/api/updateTodo/${_id}`, todo)
export const deleteTodo = (_id) => axios.delete(`/api/deleteTodo/${_id}`)
export const completeTodo = (_id, completed) => axios.patch(`/api/completeTodo/${_id}`, { completed })
