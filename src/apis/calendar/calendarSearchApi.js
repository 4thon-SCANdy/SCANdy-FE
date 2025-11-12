import defaultInstance from "../utils/instance";

export const calendarSearchApi = async (query, start, end) => {
  try {
    const response = await defaultInstance.get("/calendar/events/search", {
      params: { q: query, start, end },
    });
    console.log("일정 검색 성공: ", response.data);
    return response.data;
  } catch (error) {
    console.error("일정 검색 실패: ", error);
    throw error;
  }
};
