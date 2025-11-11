import axios from "axios";

 // 개발환경(local)에서는 Vite proxy(/api)를 통해 CORS 우회
 const BASE_URL = import.meta.env.DEV ? "/api" : import.meta.env.VITE_BASE_URL;

const defaultInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

defaultInstance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("access_token");
  if (token) {
    const bearer = `Bearer ${token}`;
    config.headers.Authorization = bearer;
    // 일부 엔드포인트 호환을 위해 token 헤더도 함께 첨부
    config.headers.token = bearer;
  }
  return config;
});

export default defaultInstance;
