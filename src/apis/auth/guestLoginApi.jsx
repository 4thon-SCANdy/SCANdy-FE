import defaultInstance from "../utils/instance";
import guestRegisterApi from "./guestRegisterApi";

const guestLoginApi = async () => {
  try {
    // 일부 서버에서 빈 바디가 필요할 수 있어 {} 전송
    const response = await defaultInstance.post("/session/user/login/", {});
    const { token, message } = response.data;

    console.log("게스트 로그인 성공:", message);

    sessionStorage.setItem("access_token", token);

    return response.data;
  } catch (error) {
    // 401/403이면 게스트 회원가입 후 한 번 더 로그인 재시도
    const status = error?.response?.status;
    if (status === 401 || status === 403) {
      try {
        await guestRegisterApi();
        const retry = await defaultInstance.post("/session/user/login/", {});
        const { token, message } = retry.data || {};
        if (token) {
          sessionStorage.setItem("access_token", token);
        }
        console.log("게스트 로그인 재시도 성공:", message);
        return retry.data;
      } catch (e) {
        console.error("게스트 로그인 실패(재시도 포함):", e);
        throw e;
      }
    }
    console.error("게스트 로그인 실패:", error);
    throw error;
  }
};

export default guestLoginApi;
