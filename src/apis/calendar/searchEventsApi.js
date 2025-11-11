import instance from "@/apis/utils/instance";

// GET /calendar/events/search
// params: { q, start, end }
export async function searchEventsApi({ q, start, end }) {
  const params = {};
  if (q) params.q = q;
  if (start) params.start = start;
  if (end) params.end = end;
  const { data } = await instance.get("/calendar/events/search", { params });
  return data;
}


