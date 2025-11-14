import instance from "@/apis/utils/instance";

// 개별 일정 상세 조회
export async function getEventDetailApi(eventId) {
  if (!eventId) throw new Error("eventId is required");
  const url = `/calendar/events/${eventId}`;
  const { data } = await instance.get(url);
  return data;
}


