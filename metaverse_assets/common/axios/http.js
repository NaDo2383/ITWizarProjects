import axios from 'axios'
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
axios.defaults.baseURL = process.env.url + '/api'
// const token = getLocal(Local.TOKEN);

// if (token) {
//   axios.defaults.headers.common.Authorization = `Bearer ${token}`;
// }
export default axios
