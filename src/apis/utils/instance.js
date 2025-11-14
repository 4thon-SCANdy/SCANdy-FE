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
  // 다양한 저장소/환경에서 유효 토큰 읽기
  let token =
    sessionStorage.getItem("access_token") ||
    localStorage.getItem("access_token") ||
    sessionStorage.getItem("token") ||
    localStorage.getItem("token") ||
    "";
  if (token === "undefined" || token === "null") token = "";
  // 환경 변수 토큰(VITE_DEV_TOKEN)도 허용 (로컬 개발 편의)
  if (!token && import.meta.env?.DEV) {
    const envToken = import.meta.env?.VITE_DEV_TOKEN;
    if (envToken && envToken !== "undefined" && envToken !== "null") {
      token = envToken;
    }
  }
  // 인증 엔드포인트에는 Authorization 헤더를 붙이지 않음
  const url = String(config?.url || "");
  const isAuthEndpoint =
    /\/session\/user\/(login|register)\/?$/i.test(url);

  if (token && !isAuthEndpoint) {
    // 스킴 자동 판별: 이미 스킴이 있으면 그대로, JWT 형태면 Bearer, 그 외는 Token
    const lower = token.toLowerCase();
    const headerValue =
      lower.startsWith("bearer ") || lower.startsWith("token ")
        ? token
        : token.split(".").length === 3
        ? `Bearer ${token}`
        : `Token ${token}`;
    config.headers.Authorization = headerValue;
    // 일부 엔드포인트 호환을 위해 token 헤더도 함께 첨부
    config.headers.token = headerValue;
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
