import instance from "@/apis/utils/instance";

// GET /task/{task_id}
export async function taskGetApi(taskId) {
  const { data } = await instance.get(`/task/${taskId}`);
  return data;
}


