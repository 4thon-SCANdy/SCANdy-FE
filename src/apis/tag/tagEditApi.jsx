import defaultInstance from "../utils/instance";

const tagEditApi = async (tagId, name, color, calendar) => {
  try {
    const response = await defaultInstance.patch(`/calendar/tag/${tagId}`, {
      name,
      color,
      calendar,
      headers: defaultInstance.defaults.headers,
    });

    console.log("태그 수정 성공: ", response.data);
    return response.data;
  } catch (error) {
    console.error("태그 수정 실패: ", error);
    throw error;
  }
};

export default tagEditApi;
