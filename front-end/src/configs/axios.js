import axios from 'axios'
import config from './config'

const instance = axios.create({
    baseURL: config.backend,
    withCredentials: true,
})

export default instance