import axios from 'axios'
import config from './config'

const instance = axios.create({
    baseURL: config.backend_url,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',

    }
})

export default instance