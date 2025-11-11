import instance from "@/apis/utils/instance";

// POST /calendar/events
export async function createEventApi(body) {
  const { data } = await instance.post("/calendar/events", body);
  return data;
}


