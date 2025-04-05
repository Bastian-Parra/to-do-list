// imports
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'


// routes import
import todoRoutes from './routes/todosRoutes.js'

// database import
import connectDB from './config/database.js'

// port configuration
const PORT = process.env.PORT || 5000

// express app initialization
const app = express()

const options = [
    'https://bstydev-todolist.netlify.app',
    'http://localhost:3000' // Para desarrollo local
]


// middleware
app.use(cors({
    origin: function (origin, callback) {
        if(!origin | options.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
}))
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// routes segment
app.use('/api', todoRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`)

    try {
        await connectDB
        console.log('MongoDB connected successfully')
    } catch (error) {
        console.error('MongoDB connection error:', error)
    }
})





