import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
    task: String,
    date: Date,
    completed: {
        type: Boolean,
        default: false
    }
})

export const Todo = mongoose.model('Task', TodoSchema, 'tasks');