import { useEffect, useState } from "react";
import * as S from "./MainPage.style";
import MainCenterSection from "./components/MainCenterSection";
import MainLeftSection from "./components/MainLeftSection";
import MainRightSection from "./components/MainRightSection";
import RegisterModal from "@/components/modals/register/RegisterModal";
import ScheduleListModal from "@/components/modals/schedule/ScheduleListModal";
import OriginalImageModal from "@/components/modals/analysis/OriginalImageModal";
import { useLocation } from "react-router-dom";
import GoogleSuccessModal from "../loginPage/components/GoogleSuccessModal";
import GoogleModal from "../loginPage/components/GoogleModal";
import googleSyncApi from "../../apis/auth/googleSyncApi";
import tagGetApi from "../../apis/tag/tagGetApi";
import allPlanGetApi from "../../apis/main/allPlanGetApi";
import { TAG_COLOR_MAP } from "../../constants/tagColorMap";
import { getEventDetailApi } from "../../apis/calendar/getEventDetailApi";
import { deleteEventApi } from "../../apis/calendar/deleteEventApi";

const MainPage = () => {
  const location = useLocation();
  const [selectedTag, setSelectedTag] = useState(null);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [registerDate, setRegisterDate] = useState(null);
  const [googleModalOpen, setGoogleModalOpen] = useState(false);

  const [isGoogleSynced, setIsGoogleSynced] = useState(false);

  const [tags, setTags] = useState([]);

  const DEFAULT_TAGS = [
    { id: -1, name: "학업", color: 13 },
    { id: -2, name: "일상", color: 7 },
    { id: -3, name: "건강", color: 4 },
  ];

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await tagGetApi();

        const fetchedTags = Array.isArray(res.data?.data) ? res.data.data : [];

        const mergedTags = [
          ...DEFAULT_TAGS,
          ...fetchedTags.filter(
            (tag) => !DEFAULT_TAGS.some((d) => d.name === tag.name)
          ),
        ];

        setTags(mergedTags);
      } catch (error) {
        console.error("태그 불러오기 실패: ", error);
        setTags(DEFAULT_TAGS);
      }
    };

    fetchTags();
  }, []);

  const [schedules, setSchedules] = useState([]);

  // 일정 리스트 모달/원본 이미지 모달 상태
  const [listOpen, setListOpen] = useState(false);
  const [listItemsWithOriginal, setListItemsWithOriginal] = useState([]);
  const [listItemsNoOriginal, setListItemsNoOriginal] = useState([]);
  const [originalOpen, setOriginalOpen] = useState(false);
  const [originalImages, setOriginalImages] = useState([]);
  const [originalOcr, setOriginalOcr] = useState([]);
  const [originalLlm, setOriginalLlm] = useState([]);
  const [originalRecs, setOriginalRecs] = useState([]);
  const [editingFromList, setEditingFromList] = useState(null);
  const [selectedDateForList, setSelectedDateForList] = useState(null);

  // 서버 응답을 메인 캘린더가 사용하는 형태로 변환 + 기간/반복 확장 + 태그 색 매핑
  const expandForCalendar = (raw, tagList) => {
    if (!Array.isArray(raw)) return [];
    const tagsSafe = Array.isArray(tagList) ? tagList : [];
    const toDateOnly = (iso) => {
      if (!iso) return "";
      try { return String(iso).slice(0, 10); } catch { return ""; }
    };
    const resolveTag = (tagField) => {
      let tagObj;
      if (tagField && typeof tagField === "object") tagObj = tagField;
      else if (typeof tagField === "number")
        tagObj = tagsSafe.find((t) => t.id === tagField);
      const name = tagObj?.name ?? "기타";
      let color = TAG_COLOR_MAP[0];
      if (typeof tagObj?.color === "number")
        color = TAG_COLOR_MAP[tagObj.color] || TAG_COLOR_MAP[0];
      else if (typeof tagObj?.color === "string") color = tagObj.color;
      return { name, color };
    };
    const addRange = (eventId, title, tagName, tagColor, s, e) => {
      const start = new Date(s);
      const end = new Date(e || s);
      const out = [];
      for (const cur = new Date(start); !Number.isNaN(cur.valueOf()) && cur <= end; cur.setDate(cur.getDate() + 1)) {
        const y = cur.getFullYear();
        const m = String(cur.getMonth() + 1).padStart(2, "0");
        const d = String(cur.getDate()).padStart(2, "0");
        const date = `${y}-${m}-${d}`;
        out.push({
          id: `${eventId}-${date}`,
          eventId,
          date,
          tag: tagName,
          tagName,
          tagColor,
          title: title || "",
        });
      }
      return out;
    };
    const result = [];
    raw.forEach((it) => {
      if (!it || typeof it !== "object") return;
      const eventId = it.id ?? `${Date.now()}`;
      const title = it.title || it.content || "";
      const { name: tagName, color: tagColor } = resolveTag(it.tag);
      const baseStart = toDateOnly(it.start_datetime) || toDateOnly(it.start_date);
      const baseEnd = toDateOnly(it.end_datetime) || toDateOnly(it.end_date) || baseStart;
      const repeat = String(it.repeat || "NONE").toUpperCase();
      const until = toDateOnly(it.until);
      if (!baseStart) return;
      if (repeat === "NONE" || !until) {
        result.push(...addRange(eventId, title, tagName, tagColor, baseStart, baseEnd));
      } else if (repeat === "DAILY") {
        try {
          for (let cur = new Date(baseStart), end = new Date(until); cur <= end; cur.setDate(cur.getDate() + 1)) {
            const y = cur.getFullYear();
            const m = String(cur.getMonth() + 1).padStart(2, "0");
            const d = String(cur.getDate()).padStart(2, "0");
            const dateStr = `${y}-${m}-${d}`;
            result.push(...addRange(eventId, title, tagName, tagColor, dateStr, dateStr));
          }
        } catch {
          result.push(...addRange(eventId, title, tagName, tagColor, baseStart, baseEnd));
        }
      } else if (repeat === "WEEKLY") {
        try {
          let curStart = new Date(baseStart);
          let curEnd = new Date(baseEnd);
          const untilDate = new Date(until);
          while (curStart <= untilDate) {
            const s = `${curStart.getFullYear()}-${String(curStart.getMonth() + 1).padStart(2, "0")}-${String(curStart.getDate()).padStart(2, "0")}`;
            const e = `${curEnd.getFullYear()}-${String(curEnd.getMonth() + 1).padStart(2, "0")}-${String(curEnd.getDate()).padStart(2, "0")}`;
            result.push(...addRange(eventId, title, tagName, tagColor, s, e));
            curStart.setDate(curStart.getDate() + 7);
            curEnd.setDate(curEnd.getDate() + 7);
          }
        } catch {
          result.push(...addRange(eventId, title, tagName, tagColor, baseStart, baseEnd));
        }
      } else {
        result.push(...addRange(eventId, title, tagName, tagColor, baseStart, baseEnd));
      }
    });
    return result;
  };

  const transformForCalendar = (fetchedArr, tagList) => {
    const list = Array.isArray(fetchedArr) ? fetchedArr : [];
    const tagsSafe = Array.isArray(tagList) ? tagList : [];
    return list.map((item) => {
      let tagObj;
      if (item && typeof item.tag === "object" && item.tag !== null) {
        tagObj = item.tag;
      } else if (typeof item?.tag === "number") {
        tagObj = tagsSafe.find((t) => t.id === item.tag);
      }
      const tagName = tagObj?.name ?? "기타";
      let tagColorValue = TAG_COLOR_MAP[0];
      if (typeof tagObj?.color === "number") {
        tagColorValue = TAG_COLOR_MAP[tagObj.color] || TAG_COLOR_MAP[0];
      } else if (typeof tagObj?.color === "string") {
        tagColorValue = tagObj.color;
      }
      return {
        ...item,
        date: String(item?.start_datetime || "").split("T")[0] || "",
        tag: tagName,
        tagName,
        tagColor: tagColorValue,
      };
    });
  };

  const refreshSchedules = async () => {
    try {
      const res = await allPlanGetApi({ _ts: Date.now() });
      let fetched = [];
      if (Array.isArray(res)) {
        fetched = res;
      } else if (Array.isArray(res?.data)) {
        fetched = res.data;
      } else if (Array.isArray(res?.data?.data)) {
        fetched = res.data.data;
      }
      setSchedules(expandForCalendar(fetched, tags));
    } catch (err) {
      console.error("일정 재조회 실패: ", err);
      setSchedules([]);
    }
  };

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const res = await allPlanGetApi({ _ts: Date.now() });
        let fetched = [];
        if (Array.isArray(res)) {
          fetched = res;
        } else if (Array.isArray(res.data)) {
          fetched = res.data;
        } else if (Array.isArray(res.data?.data)) {
          fetched = res.data.data;
        }

        const tagMap = {};
        tags.forEach((t) => {
          tagMap[t.id] = t;
        });

        setSchedules(expandForCalendar(fetched, tags));
      } catch (err) {
        console.error("일정 조회 실패: ", err);
        setSchedules([]);
      }
    };

    if (tags.length > 0) {
      fetchSchedules();
    }
  }, [tags]);

  const handleOpenScheduleList = async (dateObj, dailySchedules) => {
    try {
      setSelectedDateForList(dateObj instanceof Date ? dateObj : null);
      // 상세 조회 병렬 호출
      const details = await Promise.all(
        (dailySchedules || []).map(async (s) => {
          try {
            const realId = s.eventId ?? s.id;
            const res = await getEventDetailApi(realId);
            return res?.data || res;
          } catch (e) {
            console.error("상세 조회 실패: ", s?.id || s?.eventId, e);
            return null;
          }
        })
      );
      let safe = details.filter(Boolean);
      const extractTime = (detail) => {
        // 1) 서버가 start_time 제공 시 우선 사용
        const raw = detail?.start_time;
        if (raw && typeof raw === "string") {
          // 포맷 다양성 대비: HH:mm[:ss] 형태 지원
          const hhmm = raw.slice(0, 5);
          if (/^\d{2}:\d{2}$/.test(hhmm)) return hhmm;
        }
        // 2) start_datetime 에서 HH:mm 추출
        const dt = detail?.start_datetime;
        if (dt) {
          try {
            const d = new Date(dt);
            if (!Number.isNaN(d.valueOf())) {
              const hh = String(d.getHours()).padStart(2, "0");
              const mm = String(d.getMinutes()).padStart(2, "0");
              return `${hh}:${mm}`;
            }
          } catch {}
        }
        // 3) 기본값
        return "00:00";
      };
      const toAmpm = (detail) => {
        // time 우선 → datetime 순서로 AM/PM 계산
        const timeStr = extractTime(detail);
        const hhByTime = Number(String(timeStr || "00:00").slice(0, 2));
        if (!Number.isNaN(hhByTime)) return hhByTime >= 12 ? "PM" : "AM";
        try {
          const d = new Date(detail?.start_datetime);
          const h = d.getHours();
          return h >= 12 ? "PM" : "AM";
        } catch {
          return "AM";
        }
      };
      // 상세 조회가 전부 실패(토큰 없음/권한 문제 등)하면, 전달받은 dailySchedules 기반으로 폴백
      if (!safe.length && Array.isArray(dailySchedules) && dailySchedules.length) {
        safe = dailySchedules.map((s) => ({
          // 가능한 한 필드 맞춰주기 (없으면 빈 값)
          id: s.eventId ?? s.id ?? `${s.date}-${s.title ?? ""}`,
          title: s.title || "",
          start_time: s.time || "00:00",
          tag: s.tag ? [{ name: typeof s.tag === "object" ? s.tag.name : s.tag }] : [],
          images: Array.isArray(s.imageUrls) ? s.imageUrls.map((u, i) => ({ id: i, image_url: u })) : [],
        }));
      }
      const itemsWith = [];
      const itemsNo = [];
      (safe || []).forEach((d, idx) => {
        const src = (dailySchedules || [])[idx] || {};
        const pickTagName = () => {
          // 서버 상세에서 배열 형태
          if (Array.isArray(d.tag) && d.tag.length) {
            const n0 = d.tag[0]?.name || d.tag[0];
            if (typeof n0 === "string" && n0) return n0;
          }
          // 서버 상세에서 객체 형태
          if (d.tag && typeof d.tag === "object" && d.tag.name) {
            return d.tag.name;
          }
          // 문자열 형태
          if (typeof d.tag === "string" && d.tag) return d.tag;
          // 로컬 폴백 (메인 캘린더 아이템)
          if (typeof src.tagLabel === "string" && src.tagLabel) return src.tagLabel;
          if (typeof src.tagName === "string" && src.tagName) return src.tagName;
          if (typeof src.tag === "string" && src.tag) return src.tag;
          if (src.tag && typeof src.tag === "object" && src.tag.name) return src.tag.name;
          return undefined;
        };
        const firstTagName = pickTagName();
        const resolveTagColor = (tagName) => {
          if (!tagName) return "#EAEAEA";
          const match = tags.find((t) => t.name === tagName);
          if (!match) return "#EAEAEA";
          if (typeof match.color === "number") {
            return TAG_COLOR_MAP[match.color] || "#EAEAEA";
          }
          if (typeof match.color === "string") return match.color;
          return "#EAEAEA";
        };
        const firstTagColor = resolveTagColor(firstTagName);
        const baseItem = {
          id: d.id,
          ampm: toAmpm(d),
          time: extractTime(d),
          title: d.title || "",
          tagLabel: firstTagName,
          tagColor: firstTagColor,
          __detail: d,
          __local: src, // 이미지/ocr/llm 등 로컬 생성 정보
        };
        const localImages = Array.isArray(src.imageUrls) ? src.imageUrls : [];
        const hasImages = (Array.isArray(d.images) && d.images.length > 0) || localImages.length > 0;
        if (hasImages) itemsWith.push(baseItem);
        else itemsNo.push(baseItem);
      });
      setListItemsWithOriginal(itemsWith);
      setListItemsNoOriginal(itemsNo);
      setListOpen(true);
    } catch (e) {
      console.error("일정 리스트 오픈 실패: ", e);
      // 에러 시에도 최소한 빈 리스트라도 열어 사용자 흐름 유지
      setListItemsWithOriginal([]);
      setListItemsNoOriginal([]);
      setListOpen(true);
    }
  };

  const handleRenameTag = (oldName, newName) => {
    setSchedules((prev) =>
      prev.map((s) => (s.tag === oldName ? { ...s, tag: newName } : s))
    );
  };

  const [modalInfo, setModalInfo] = useState({
    open: false,
    type: "success",
    email: "",
  });

  useEffect(() => {
    const checkGoogleSync = async () => {
      try {
        const data = await googleSyncApi();
        console.log("구글 연동 여부: ", data.is_google_sync);
        setIsGoogleSynced(data.is_google_sync);
      } catch (error) {
        console.error("구글 연동 여부 확인 실패: ", error);
      }
    };

    checkGoogleSync();
  }, []);

  useEffect(() => {
    if (location.state?.success !== undefined) {
      setModalInfo({
        open: true,
        type: location.state.success ? "success" : "fail",
        email: location.state.email || "",
      });
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // 브라우저 포커스/가시성 복귀 시, 수정 플래그가 있으면 재조회
  useEffect(() => {
    const tryRefreshIfNeeded = () => {
      try {
        const flag = sessionStorage.getItem("needs_schedule_refresh");
        if (flag === "1") {
          sessionStorage.removeItem("needs_schedule_refresh");
          refreshSchedules();
        }
      } catch {}
    };
    const onFocus = () => tryRefreshIfNeeded();
    const onPageShow = () => tryRefreshIfNeeded();
    const onVisibility = () => {
      if (document.visibilityState === "visible") tryRefreshIfNeeded();
    };
    window.addEventListener("focus", onFocus);
    window.addEventListener("pageshow", onPageShow);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("pageshow", onPageShow);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <>
      <S.MainContainer>
        <MainLeftSection
          tags={tags}
          setTags={setTags}
          setSelectedTag={setSelectedTag}
          selectedTag={selectedTag}
          onRenameTag={handleRenameTag}
        />
        <MainCenterSection
          tags={tags}
          schedules={schedules}
          selectedTag={selectedTag}
          onOpenRegister={(date) => {
            setEditingFromList(null);
            setRegisterDate(date);
            setRegisterOpen(true);
          }}
          onOpenScheduleList={handleOpenScheduleList}
        />
        <MainRightSection
          tags={tags}
          schedules={schedules}
          selectedTag={selectedTag}
          onOpenGoogle={() => setGoogleModalOpen(true)}
          isGoogleSynced={isGoogleSynced}
        />
      </S.MainContainer>
      <RegisterModal
        open={registerOpen}
        onClose={() => { setRegisterOpen(false); setEditingFromList(null); }}
        initialDate={registerDate}
        editSchedule={editingFromList}
        onDeleteEdit={async (editObj) => {
          const idRaw = editObj?.id || editingFromList?.id;
          if (!idRaw) {
            setRegisterOpen(false);
            setEditingFromList(null);
            return;
          }
          const idStr = String(idRaw);
          // 1) UI를 먼저 낙관적으로 업데이트(해당 이벤트의 모든 항목 제거)
          setSchedules((prev) =>
            prev.filter(
              (s) => String(s.eventId) !== idStr && String(s.id) !== idStr
            )
          );
          try {
            // 2) 서버 삭제 시도
            await deleteEventApi(idRaw);
          } catch (e) {
            console.error("deleteEventApi error", e);
          } finally {
            // 3) 안전망: 복귀/포커스 시 재조회 플래그 + 즉시 재조회
            try { sessionStorage.setItem("needs_schedule_refresh", "1"); } catch {}
            refreshSchedules();
            setRegisterOpen(false);
            setEditingFromList(null);
          }
        }}
        onCreated={(newItem) => {
          // 태그 존재 보장
          if (newItem?.tag && !tags.some((t) => t.name === newItem.tag)) {
            setTags((prev) => [
              ...prev,
              {
                id: Date.now(),
                name: newItem.tag,
                // 서버 스펙에 맞춰 사용자 태그는 color 인덱스(숫자)로 유지
                color:
                  typeof newItem.tagColorIndex === "number"
                    ? newItem.tagColorIndex
                    : 3, // 기본 인덱스(보라) fallback
              },
            ]);
          }
          // 날짜/반복 규칙에 따라 범위 확장
          const addRange = (s, e) => {
            const start = new Date(s);
            const end = new Date(e || s);
            const days = [];
            const cur = new Date(start);
            while (cur <= end) {
              const y = cur.getFullYear();
              const m = String(cur.getMonth() + 1).padStart(2, "0");
              const d = String(cur.getDate()).padStart(2, "0");
              days.push(`${y}-${m}-${d}`);
              cur.setDate(cur.getDate() + 1);
            }
            return days.map((date) => ({
              id: `${newItem.id}-${date}`,
              eventId: newItem.id,
              date,
              tag: newItem.tag,
            tagName: newItem.tag,
            tagColor: TAG_COLOR_MAP[newItem.tagColorIndex] || TAG_COLOR_MAP[0],
              title: newItem.title,
              imageUrls: Array.isArray(newItem.imageUrls) ? newItem.imageUrls : undefined,
              ocrList: Array.isArray(newItem.ocrList) ? newItem.ocrList : undefined,
              llmList: Array.isArray(newItem.llmList) ? newItem.llmList : undefined,
              recommendations: Array.isArray(newItem.recommendations) ? newItem.recommendations : undefined,
            }));
          };

          const baseStart = newItem.startDate || newItem.date;
          const baseEnd = newItem.endDate || newItem.startDate || newItem.date;
          const repeat = newItem.repeat || "NONE";
          const until = newItem.until ? new Date(newItem.until) : null;

          let acc = [];
          if (repeat === "NONE" || !until) {
            acc = addRange(baseStart, baseEnd);
          } else if (repeat === "DAILY") {
            // 매일: 시작일부터 until일까지 매일 동일 태그 표시
            const cur = new Date(baseStart);
            while (cur <= until) {
              const y = cur.getFullYear();
              const m = String(cur.getMonth() + 1).padStart(2, "0");
              const d = String(cur.getDate()).padStart(2, "0");
              acc.push({
                id: `${newItem.id}-${y}${m}${d}`,
                eventId: newItem.id,
                date: `${y}-${m}-${d}`,
                tag: newItem.tag,
                tagName: newItem.tag,
                tagColor: TAG_COLOR_MAP[newItem.tagColorIndex] || TAG_COLOR_MAP[0],
                title: newItem.title,
                imageUrls: Array.isArray(newItem.imageUrls) ? newItem.imageUrls : undefined,
                ocrList: Array.isArray(newItem.ocrList) ? newItem.ocrList : undefined,
                llmList: Array.isArray(newItem.llmList) ? newItem.llmList : undefined,
                recommendations: Array.isArray(newItem.recommendations) ? newItem.recommendations : undefined,
              });
              cur.setDate(cur.getDate() + 1);
            }
          } else if (repeat === "WEEKLY") {
            // 매주: (시작~끝) 구간을 1주 간격으로 until까지 반복
            const start0 = new Date(baseStart);
            const end0 = new Date(baseEnd);
            let curStart = new Date(start0);
            let curEnd = new Date(end0);
            while (curStart <= until) {
              acc = acc.concat(
                addRange(
                  `${curStart.getFullYear()}-${String(
                    curStart.getMonth() + 1
                  ).padStart(2, "0")}-${String(curStart.getDate()).padStart(
                    2,
                    "0"
                  )}`,
                  `${curEnd.getFullYear()}-${String(
                    curEnd.getMonth() + 1
                  ).padStart(2, "0")}-${String(curEnd.getDate()).padStart(
                    2,
                    "0"
                  )}`
                )
              );
              curStart.setDate(curStart.getDate() + 7);
              curEnd.setDate(curEnd.getDate() + 7);
            }
          } else {
            // 다른 주기(MONTHLY/YEARLY)는 아직 미지원: 단일 구간만 표시
            acc = addRange(baseStart, baseEnd);
          }

          setSchedules((prev) => [...prev, ...acc]);
          setRegisterOpen(false);
        }}
      onUpdated={refreshSchedules}
      />

      <ScheduleListModal
        open={listOpen}
        onClose={() => setListOpen(false)}
        selectedDate={selectedDateForList}
        itemsWithOriginal={listItemsWithOriginal}
        itemsNoOriginal={listItemsNoOriginal}
        onEdit={(item) => {
          const d = item?.__detail;
          if (!d) return;
          // RegisterModal 편의 포맷으로 매핑
          const toRepeatType = (rep) => {
            const r = String(rep || "").toUpperCase();
            if (r === "WEEKLY") return "weekly";
            if (r === "MONTHLY") return "monthly";
            if (r === "YEARLY") return "yearly";
            return "daily";
          };
          const toDateOnly = (v) => {
            if (!v) return "";
            try {
              return String(v).slice(0, 10);
            } catch {
              return "";
            }
          };
          const extractTime = (rawTime, rawDatetime) => {
            // 1) 명시적 time 우선
            if (rawTime && typeof rawTime === "string") {
              const hhmm = rawTime.slice(0, 5);
              if (/^\d{2}:\d{2}$/.test(hhmm)) return hhmm;
            }
            // 2) datetime에서 HH:mm
            if (rawDatetime) {
              try {
                const dt = new Date(rawDatetime);
                if (!Number.isNaN(dt.valueOf())) {
                  const hh = String(dt.getHours()).padStart(2, "0");
                  const mm = String(dt.getMinutes()).padStart(2, "0");
                  return `${hh}:${mm}`;
                }
              } catch {}
            }
            return "00:00";
          };
          const startTime24 = extractTime(d.start_time, d.start_datetime);
          const endTime24 = d.all_day
            ? "00:00"
            : extractTime(d.end_time || null, d.end_datetime || d.start_datetime);
          const local = item?.__local || {};
          setEditingFromList({
            id: d.id,
            title: d.title || "",
            // 서버 상세 → ISO → 로컬(date) 순서로 안정적인 기본값 지정
            startDate:
              d.start_date ||
              toDateOnly(d.start_datetime) ||
              (local.date || ""),
            endDate:
              d.end_date ||
              d.start_date ||
              toDateOnly(d.end_datetime) ||
              (local.date || ""),
            startTime: startTime24,
            endTime: endTime24 || startTime24,
            location: d.location || "",
            allDay: !!d.all_day,
            repeatOn: !!d.repeat && String(d.repeat).toUpperCase() !== "NONE",
            repeatType: toRepeatType(d.repeat),
            repeatEnd: toDateOnly(d.until) || "",
            tagLabel:
              (Array.isArray(d.tag) && d.tag.length ? d.tag[0]?.name : undefined) ||
              local.tagLabel ||
              (typeof local.tag === "object" ? local.tag?.name : local.tag) ||
              undefined,
          });
          setListOpen(false);
          setRegisterOpen(true);
        }}
        onViewOriginal={(item) => {
          const d = item?.__detail;
          const local = item?.__local || {};
          const imgsFromServer = Array.isArray(d?.images) ? d.images.map((x) => x?.image_url).filter(Boolean) : [];
          const imgs = (imgsFromServer.length ? imgsFromServer : (Array.isArray(local.imageUrls) ? local.imageUrls : []));
          setOriginalImages(imgs);
          // OCR/LLM/RECS도 로컬 보관분이 있으면 전달
          setOriginalOcr(Array.isArray(local.ocrList) ? local.ocrList : []);
          setOriginalLlm(Array.isArray(local.llmList) ? local.llmList : []);
          setOriginalRecs(Array.isArray(local.recommendations) ? local.recommendations : []);
          setOriginalOpen(true);
        }}
      />

      <OriginalImageModal
        open={originalOpen}
        images={originalImages}
        ocrList={originalOcr}
        llmList={originalLlm}
        recommendations={originalRecs}
        onClose={() => setOriginalOpen(false)}
        onConfirm={() => setOriginalOpen(false)}
      />

      {modalInfo.open && (
        <GoogleSuccessModal
          type={modalInfo.type}
          email={modalInfo.email}
          onClose={() => {
            setModalInfo({ open: false, type: "success", email: "" });

            // // 실패 시 로그인 페이지로 리다이렉트
            // if (modalInfo.type === "fail") {
            //   window.location.href = "/login";
            // }
          }}
        />
      )}

      {googleModalOpen && (
        <GoogleModal onClose={() => setGoogleModalOpen(false)} />
      )}
    </>
  );
};

export default MainPage;
