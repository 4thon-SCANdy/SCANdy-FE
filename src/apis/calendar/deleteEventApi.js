import instance from "@/apis/utils/instance";

// DELETE /calendar/events/{id}
export async function deleteEventApi(eventId) {
  if (!eventId) throw new Error("eventId is required");
  const url = `/calendar/events/${eventId}`;
  const { data } = await instance.delete(url);
  return data;
}



