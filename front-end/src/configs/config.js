import dotenv from 'dotenv'

dotenv.config()

const config = {
    backend: process.env.BACKEND_URL
}

export default config