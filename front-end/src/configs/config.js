import dotenv from 'dotenv'

dotenv.config()

const config = {
    backend_url: import.meta.env.VITE_BACKEND_URL ||'http://localhost:4000',
}

export default config