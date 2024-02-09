import axios, { AxiosInstance } from "axios";

axios.defaults.withCredentials = true; // cookie - д бга бүх зүйлийг rest service рүү дамжуулах тохиргоо
axios.defaults.baseURL = process.env.url;


export default axios;
