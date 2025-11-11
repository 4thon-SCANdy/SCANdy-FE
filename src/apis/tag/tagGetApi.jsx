import defaultInstance from "../utils/instance";

const tagGetApi = async () => {
  try {
    const response = await defaultInstance.get(`/calendar/tag`);

    console.log("태그 조회 성공: ", response.data);
    return response.data;
  } catch (error) {
    console.error("태그 조회 실패: ", error);
    throw error;
  }
};

export default tagGetApi;
