import defaultInstance from "../utils/instance";

const guestRegisterApi = async () => {
  try {
    const response = await defaultInstance.post("/session/user/register/");
    const message = response?.data?.message || "가입 없이 진행 성공";
    console.log("가입 없이 진행 성공:", message);
    return response.data;
  } catch (error) {
    console.error("가입 없이 진행 실패:", error);
    throw error;
  }
};

export default guestRegisterApi;
