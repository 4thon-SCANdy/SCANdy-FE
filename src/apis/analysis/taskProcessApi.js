import instance from "@/apis/utils/instance";

// POST /task/process/
// files: File[] (image files)
export async function taskProcessApi(files = []) {
  const safeFiles = Array.isArray(files) ? files.filter(Boolean) : [];
  if (safeFiles.length === 0) {
    throw new Error("업로드할 이미지가 없습니다.");
  }

  // 서버 명세: images 필드명으로 멀티 파일 업로드
  const form = new FormData();
  safeFiles.forEach((file) => {
    form.append("images", file, file.name || "image.png");
  });
  // 디버그: 개발 모드에서 업로드 파일 목록 출력
  try {
    if (import.meta.env?.DEV) {
      const debug = [];
      for (const [k, v] of form.entries()) {
        if (v && typeof v === "object" && "name" in v) {
          debug.push(`${k}:${v.name}(${v.type || "unknown"})`);
        } else {
          debug.push(`${k}:${String(v).slice(0, 32)}`);
        }
      }
      // eslint-disable-next-line no-console
      console.log("[taskProcessApi] FormData ->", debug.join(", "));
    }
  } catch {}

  // Authorization을 확실히 첨부하고, 쿠키는 보내지 않음
  const rawToken =
    sessionStorage.getItem("access_token") ||
    localStorage.getItem("access_token") ||
    sessionStorage.getItem("token") ||
    localStorage.getItem("token") ||
    "";
  let authHeader = undefined;
  if (rawToken) {
    const lower = rawToken.toLowerCase();
    authHeader =
      lower.startsWith("bearer ") || lower.startsWith("token ")
        ? rawToken
        : rawToken.split(".").length === 3
        ? `Bearer ${rawToken}`
        : `Token ${rawToken}`;
  }

  const { data } = await instance.post("/task/process/", form, {
    headers: authHeader ? { Authorization: authHeader } : {},
    withCredentials: false,
  });
  return data;
}

