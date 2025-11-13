import instance from "@/apis/utils/instance";

// 개별 일정 수정
// PATCH /calendar/events/{id}
// body는 수정할 항목만 전송
export async function updateEventApi(eventId, body) {
  if (!eventId) throw new Error("eventId is required");
  const url = `/calendar/events/${eventId}`;
  const { data } = await instance.patch(url, body);
  return data;
}


