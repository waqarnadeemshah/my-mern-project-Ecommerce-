
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,  
  withCredentials: true, 
});
let accessToken = null;
export const setAccessToken = (token) => {
  accessToken = token;
};


API.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});


export default API;
