import axios from "./http";

// axios.interceptors.request.use(
//   async (config) => {
//     const token = getLocal(LocalName.TOKEN);
//     if (config.headers && token) {
//       config.headers.Authorization = `Bearer ${token}`;

//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// axios.interceptors.response.use(async (response) => {
//   const isAllowPath = ["/"].includes(location.pathname);
//   if (response.data.code === 401 && !isAllowPath) {
//     throw Error;
//   }
//   return response;
// });
