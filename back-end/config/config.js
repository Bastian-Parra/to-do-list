import dotenv from 'dotenv'

dotenv.config()

const config = {
    user: process.env.DB_USER,
    cluster: process.env.DB_CLUSTER,
    password: process.env.DB_PASSWORD
}

export default config