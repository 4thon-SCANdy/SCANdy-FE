import instance from "@/apis/utils/instance";
import guestLoginApi from "@/apis/auth/guestLoginApi";

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

  // Authorization을 확실히 첨부
  let rawToken =
    sessionStorage.getItem("access_token") ||
    localStorage.getItem("access_token") ||
    sessionStorage.getItem("token") ||
    localStorage.getItem("token") ||
    "";
  if (rawToken === "undefined" || rawToken === "null") rawToken = "";
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

  const send = () =>
    instance.post("/task/process/", form, {
      headers: authHeader ? { Authorization: authHeader, token: authHeader } : {},
      withCredentials: true,
    });
  try {
    const { data } = await send();
    return data;
  } catch (err) {
    const status = err?.response?.status;
    // 인증 오류면 한 번만 게스트 로그인 후 재시도(DEV 전용)
    if ((status === 401 || status === 403) && import.meta.env?.DEV) {
      try {
        const res = await guestLoginApi();
        const t = res?.token;
        if (t && t !== "undefined" && t !== "null") {
          sessionStorage.setItem("access_token", t);
          rawToken = t;
          const lower = rawToken.toLowerCase();
          authHeader =
            lower.startsWith("bearer ") || lower.startsWith("token ")
              ? rawToken
              : rawToken.split(".").length === 3
              ? `Bearer ${rawToken}`
              : `Token ${rawToken}`;
          const { data } = await send();
          return data;
        }
      } catch {}
      // 마지막 수단: DEV에서는 목 데이터를 반환해 연동 흐름을 유지
      if (import.meta.env?.DEV) {
        const now = new Date();
        const toISO = (d) => d.toISOString().slice(0, 19);
        const start = new Date(now.getTime() + 60 * 60 * 1000);
        const end = new Date(start.getTime() + 60 * 60 * 1000);
        return {
          task_id: null,
          ocr_result: ["샘플 OCR 결과 1", "샘플 OCR 결과 2"],
          llm_result: [
            {
              title: "샘플 일정",
              content: null,
              start_datetime: toISO(start),
              end_datetime: toISO(end),
              all_day: false,
              repeat: "NONE",
              location: "샘플 장소",
            },
          ],
          recommendation: [
            {
              detail: "겹치는 일정이 없습니다.",
              recommended_start: toISO(start),
              recommended_end: toISO(end),
            },
          ],
        };
      }
    }
    throw err;
  }
}

