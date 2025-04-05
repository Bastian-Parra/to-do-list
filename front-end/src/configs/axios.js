import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://to-do-list-urn8.onrender.com/api',
    withCredentials: true,
})

export default instance