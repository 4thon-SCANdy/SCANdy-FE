import defaultInstance from "../utils/instance";

const googleLoginApi = async () => {
  try {
    const response = await defaultInstance.get(`/auth/google/url/`);
    const { auth_url } = response.data;

    if (auth_url) {
      console.log("구글 로그인 URL 수신 성공: ", auth_url);
      window.location.href = auth_url;
    } else {
      console.error("구글 로그인 URL 요청 실패: ", response.data);
    }
  } catch (error) {
    console.error("구글 로그인 중 오류 발생: ", error);
  }
};

export default googleLoginApi;
