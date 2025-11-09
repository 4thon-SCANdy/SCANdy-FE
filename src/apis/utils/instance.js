import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const defaultInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
  },
});

defaultInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

export default defaultInstance;
