import axios from "axios";

 // 개발환경(local)에서는 Vite proxy(/api)를 통해 CORS 우회
 const BASE_URL = import.meta.env.DEV ? "/api" : import.meta.env.VITE_BASE_URL;

const defaultInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  // Content-Type은 데이터 타입에 따라 동적으로 설정
  headers: {},
});

defaultInstance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("access_token");
  if (token) {
    const bearer = `Bearer ${token}`;
    config.headers.Authorization = bearer;
    // 일부 엔드포인트 호환을 위해 token 헤더도 함께 첨부
    config.headers.token = bearer;
  }

  // FormData 전송 시 브라우저가 boundary 포함 Content-Type을 자동 설정하도록 유지
  if (config.data instanceof FormData) {
    if (config.headers && config.headers["Content-Type"]) {
      delete config.headers["Content-Type"];
    }
  } else {
    // 그 외에는 JSON 기본값 사용
    if (config.headers && !config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }
  }

  return config;
});

export default defaultInstance;
