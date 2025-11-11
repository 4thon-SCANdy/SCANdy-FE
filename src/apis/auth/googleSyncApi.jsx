import defaultInstance from "../utils/instance";

const googleSyncApi = async () => {
  try {
    const response = await defaultInstance.get("/auth/google/is_google_sync");
    console.log("구글 연동 여부: ", response.data);
    return response.data;
  } catch (error) {
    console.error("구글 연동 여부 확인 실패: ", error);
    throw error;
  }
};

export default googleSyncApi;
