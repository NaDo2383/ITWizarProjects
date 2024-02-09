import axios from 'axios'

axios.defaults.withCredentials = true // cookie - д бга бүх зүйлийг rest service рүү дамжуулах тохиргоо
//axios.defaults.baseURL = '/api'

export default axios