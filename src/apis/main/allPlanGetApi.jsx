// 일정 조회 (전체, 월, 태그)

import defaultInstance from "../utils/instance";

const allPlanGetApi = async (params = {}) => {
  try {
    const response = await defaultInstance.get(`/calendar/events`, { params });

    console.log("일정 조회 성공: ", response.data);
    return response.data;
  } catch (error) {
    console.error("일정 조회 실패: ", error);
    throw error;
  }
};

export default allPlanGetApi;
