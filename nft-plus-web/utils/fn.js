import axios from "axios";
import { storages } from "./libs";
import { getLocal, getCookie } from "./storage";
export const axiosApi = axios.create({
    baseURL: process.env.url,
    ...((typeof window !== 'undefined' && window.localStorage.user) && {
        headers: {
            authorization: `Bearer ${getCookie('jwt-token')}`,
        },
    }),
});



export const getImage = (url, cb) => {
    const img = new Image();
    img.onload = () => cb(null, img);
    img.onerror = (err) => cb(err);
    img.src = url;
};
