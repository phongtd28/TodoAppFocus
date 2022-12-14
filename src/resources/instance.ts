import axios from 'axios'

// const baseURL = 'https://6193c901221e680017450be7.mockapi.io/'
const baseURL = 'http://localhost:8000/'
export const instance = axios.create({
    headers: {
        'Content-Type': 'application/json'
    },
    baseURL
})
