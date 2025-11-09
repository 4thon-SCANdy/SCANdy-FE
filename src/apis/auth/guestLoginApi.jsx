import defaultInstance from "../utils/instance";

const guestLoginApi = async () => {
  try {
    const response = await defaultInstance.post("/session/user/login/");
    const { token, message } = response.data;

    console.log("게스트 로그인 성공:", message);

    sessionStorage.setItem("access_token", token);

    return response.data;
  } catch (error) {
    console.error("게스트 로그인 실패:", error);
    throw error;
  }
};

export default guestLoginApi;
