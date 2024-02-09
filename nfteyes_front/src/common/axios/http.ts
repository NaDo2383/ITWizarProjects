import axios from 'axios'
import { getToken } from 'common/token/token'
// import { config } from 'common/config/config'
// import { Local } from 'libs/constants'
// import { getLocal } from '../storage/localStorage'
// const Axios: AxiosInstance = axios.create({
//   baseURL: config.Url.BACKEND_URL,
//   headers: {
//     "Access-Control-Allow-Origin": "*",
//     "Content-Type": "application/json",
//   },
// });

axios.defaults.withCredentials = true // cookie - д бга бүх зүйлийг rest service рүү дамжуулах тохиргоо
axios.defaults.baseURL = process.env.NEXT_BACKEND_URL
// const token = getLocal(Local.TOKEN);
axios.interceptors.request.use(
    async (config) => {
        const token = typeof window !== 'undefined' && getToken()
        if (config.headers && token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

axios.interceptors.response.use(
    async (response) => {
        // Do something with the response data
        return response
    },
    async (error) => {
        // Check if the error status is 401 (Unauthorized)

        if (error.response && error.response.status === 401) {
            // Redirect to the login page
            window.location.href = '/login' // Replace '/login' with your login page URL
        }

        // Pass the error along
        return await Promise.reject(error)
    }
)

export default axios
