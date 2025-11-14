import instance from "@/apis/utils/instance";

export async function getTagsApi() {
  const { data } = await instance.get("/calendar/tag");
  return data;
}

export async function createTagApi(body) {
  const { data } = await instance.post("/calendar/tag", body);
  return data;
}


