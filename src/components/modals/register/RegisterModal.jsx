import React, { useEffect, useState, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import ModalBase from "../ModalBase";
import AnalyzeModal from "../analysis/AnalyzeModal";
import * as S from "./RegisterModal.style";
import IMAGE_PREVIEW from "@/assets/modal/Image.svg";
import DIRECT_PREVIEW from "@/assets/modal/Direct.svg";
import UPLOAD_ICON from "@/assets/modal/img.svg";
import REPEAT_ICON from "@/assets/modal/repeat.svg";
import ALLDAY_ICON from "@/assets/modal/allday.svg";
import { createEventApi } from "@/apis/calendar/createEventApi";
import { updateEventApi } from "@/apis/calendar/updateEventApi";
import { taskProcessApi } from "@/apis/analysis/taskProcessApi";
import { taskGetApi } from "@/apis/analysis/taskGetApi";
import { getColorIndex } from "@/constants/tagColorMap";
import ColorChip from "@/components/colorchip/ColorChip";

function RegisterModal({
  open,
  onClose,
  onOpenAI,
  onOpenManual,
  initialDate,
  onCreated, // 생성 성공 시 상위로 알림
  editSchedule = null,
  onSaveEdit,
  onDeleteEdit,
}) {
  const [view, setView] = useState("choice"); // choice | upload | manual
  // manual form state
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [startTime, setStartTime] = useState("00:00");
  const [endTime, setEndTime] = useState("00:00");
  const [repeatOn, setRepeatOn] = useState(false);
  const [repeatType, setRepeatType] = useState("daily"); // daily | weekly
  const [repeatEnd, setRepeatEnd] = useState("");
  const [allDay, setAllDay] = useState(false);
  const [tagOpen, setTagOpen] = useState(false);
  const [selectedTagId, setSelectedTagId] = useState("");
  const [tagList, setTagList] = useState([
    { id: "t1", name: "학업", color: "#FFD258" },
    { id: "t2", name: "일상", color: "#D9C9FF" },
    { id: "t3", name: "건강", color: "#A0D4FF" },
  ]);
  const tagListRef = useRef(tagList);
  const MAX_TAGS = 5;
  const [newTagName, setNewTagName] = useState("");
  const [newTagColor, setNewTagColor] = useState("#2BE99A");
  const [addingNewTag, setAddingNewTag] = useState(false);
  const [manualConfirmed, setManualConfirmed] = useState(false);
  const [mode, setMode] = useState("create"); // create | edit
  const [currentEdit, setCurrentEdit] = useState(null);
  const [openedFromAnalyze, setOpenedFromAnalyze] = useState(false);
  const tagButtonRef = useRef(null);
  const [tagMenuPos, setTagMenuPos] = useState({ top: 0, left: 0 });

  const isEditMode = mode === "edit";

  // 이미지 업로드 및 슬라이더 상태
  const [selectedImages, setSelectedImages] = useState([]); // [{file, url}]
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const fileInputRef = useRef(null);
  const replaceIdxRef = useRef(null);

  // 내부 분석 모달 (부모에서 onOpenAI를 넘기지 않은 경우 대비)
  const [internalAnalyzeOpen, setInternalAnalyzeOpen] = useState(false);
  const [internalAnalyzeImages, setInternalAnalyzeImages] = useState([]); // string URLs
  const [analyzing, setAnalyzing] = useState(false);
  const [aiOcrList, setAiOcrList] = useState([]);
  const [aiLlmList, setAiLlmList] = useState([]);
  const [aiRecommendations, setAiRecommendations] = useState([]);
  const [aiTaskId, setAiTaskId] = useState(null);

  const openFilePicker = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const openFilePickerForReplace = (idx) => {
    replaceIdxRef.current = idx;
    openFilePicker();
  };

  const handleFilesSelected = (e) => {
    const files = Array.from(e.target.files || []).filter(f => f.type.startsWith("image/"));
    if (!files.length) return;
    const wasEmpty = selectedImages.length === 0;
    let finalImages = selectedImages;
    // If replacing a specific index (double-click case)
    if (replaceIdxRef.current !== null && replaceIdxRef.current !== undefined) {
      const f = files[0];
      if (!f) return;
      const newObj = { file: f, url: URL.createObjectURL(f) };
      const next = [...selectedImages];
      const idx = Math.min(Math.max(replaceIdxRef.current, 0), next.length - 1);
      if (next[idx]) {
        try { URL.revokeObjectURL(next[idx].url); } catch {}
        next[idx] = newObj;
      }
      setCurrentImageIdx(idx);
      finalImages = next;
      setSelectedImages(next);
      replaceIdxRef.current = null;
    } else {
      // Append mode
      const mapped = files.slice(0, 5).map(f => ({ file: f, url: URL.createObjectURL(f) }));
      const remain = Math.max(0, 5 - selectedImages.length);
      const toAdd = mapped.slice(0, remain);
      const merged = [...selectedImages, ...toAdd];
      if (selectedImages.length === 0 && merged.length > 0) {
        setCurrentImageIdx(0);
      }
      finalImages = merged;
      setSelectedImages(merged);
    }
    // 자동 이동 제거: 사용자가 버튼을 눌렀을 때만 분석 진행
    // allow selecting the same file again later
    if (e.target) try { e.target.value = ""; } catch {}
  };

  // 모달이 열릴 때마다 초기 화면으로 리셋 (업로드 가이드가 다른 화면에 보이지 않도록)
  const resetForm = useCallback(() => {
    setStartDate("");
    setEndDate("");
    setTitle("");
    setLocation("");
    setStartTime("00:00");
    setEndTime("00:00");
    setRepeatOn(false);
    setRepeatType("daily");
    setRepeatEnd("");
    setAllDay(false);
    setSelectedTagId("");
    setTagOpen(false);
    setAddingNewTag(false);
    setNewTagName("");
    setNewTagColor("#E3E8FF");
    setManualConfirmed(false);
  }, []);

  const applyFormData = useCallback((data = {}) => {
    setStartDate(data.startDate || "");
    setEndDate(data.endDate || data.startDate || "");
    setTitle(data.title || "");
    setLocation(data.location || "");
    setStartTime(data.startTime || "00:00");
    setEndTime(data.endTime || data.startTime || "00:00");
    setRepeatOn(!!data.repeatOn);
    setRepeatType(data.repeatType || "daily");
    setRepeatEnd(data.repeatEnd || "");
    setAllDay(!!data.allDay);
    setSelectedTagId(data.tagId || "");
    setTagOpen(false);
    setAddingNewTag(false);
    setManualConfirmed(false);
  }, []);

  const to24Hour = useCallback((timeValue, ampmValue) => {
    if (!timeValue) return "00:00";
    const [rawHour, rawMinute] = `${timeValue}`.split(":");
    if (rawHour === undefined) return "00:00";
    let hour = parseInt(rawHour, 10);
    const minute = parseInt(rawMinute || "0", 10);
    if (Number.isNaN(hour) || Number.isNaN(minute)) return "00:00";
    if (ampmValue === "PM" && hour < 12) {
      hour += 12;
    } else if (ampmValue === "AM" && hour === 12) {
      hour = 0;
    }
    return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
  }, []);

  const collectFormData = useCallback(
    () => ({
      id: currentEdit?.id,
      startDate,
      endDate,
      title,
      location,
      startTime,
      endTime,
      repeatOn,
      repeatType,
      repeatEnd,
      allDay,
      tagId: selectedTagId,
    }),
    [
      currentEdit?.id,
      startDate,
      endDate,
      title,
      location,
      startTime,
      endTime,
      repeatOn,
      repeatType,
      repeatEnd,
      allDay,
      selectedTagId,
    ]
  );

  useEffect(() => {
    tagListRef.current = tagList;
  }, [tagList]);

  // 태그 메뉴 위치 계산 (포털로 띄워 overflow에 가려지지 않도록)
  useEffect(() => {
    if (!tagOpen) return;
    const update = () => {
      const el = tagButtonRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const gap = 8;
      const menuWidth = 300; // style과 동일한 기준 폭(px)
      let left = rect.left;
      if (left + menuWidth > window.innerWidth - 8) {
        left = Math.max(8, window.innerWidth - menuWidth - 8);
      }
      const top = rect.bottom + gap;
      setTagMenuPos({ top, left });
    };
    update();
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [tagOpen]);

  useEffect(() => {
    if (!open) return;
    if (editSchedule) {
      setMode("edit");
      setCurrentEdit(editSchedule);
      const tagId =
        editSchedule.tagId ||
        (editSchedule.tagLabel
          ? (tagListRef.current.find((t) => t.name === editSchedule.tagLabel) ||
              {}).id
          : "");
      applyFormData({
        id: editSchedule.id,
        startDate: editSchedule.startDate || editSchedule.date || "",
        endDate: editSchedule.endDate || editSchedule.date || "",
        title: editSchedule.title || "",
        location: editSchedule.location || "",
        startTime:
          editSchedule.startTime || to24Hour(editSchedule.time, editSchedule.ampm),
        endTime:
          editSchedule.endTime ||
          editSchedule.startTime ||
          to24Hour(editSchedule.time, editSchedule.ampm),
        repeatOn: !!editSchedule.repeatOn,
        repeatType: editSchedule.repeatType || "daily",
        repeatEnd: editSchedule.repeatEnd || "",
        allDay: !!editSchedule.allDay,
        tagId: tagId || "",
      });
      setView("manual");
    } else {
      setMode("create");
      setCurrentEdit(null);
      setSelectedImages([]);
      setCurrentImageIdx(0);
      resetForm();
      setView("choice");
    }
  }, [open, editSchedule, applyFormData, resetForm, to24Hour]);
  const isManualView = view === "manual";
  const isManualReadOnly = isManualView && manualConfirmed && !isEditMode;
  const modalHeightPx = view === "manual" ? 600 : 600;

  const manualTitle = isManualView
    ? manualConfirmed && !isEditMode
      ? "일정 등록 확인"
      : isEditMode
      ? "일정 수정하기"
      : "직접 일정 등록하기"
    : "";

  const handlePrimaryAction = async () => {
    if (isEditMode) {
      const form = collectFormData();
      // 분석 모달에서 들어온 수정인 경우: 새 일정 생성 + 메인 캘린더 반영
      if (openedFromAnalyze) {
        try {
          const toISO = (d, t) => {
            if (!d) return "";
            const time = (t || "00:00").padStart(5, "0");
            const iso = `${d}T${time.length === 5 ? `${time}:00` : time}`;
            return iso;
          };
          const repeatMap = { daily: "DAILY", weekly: "WEEKLY", monthly: "MONTHLY", yearly: "YEARLY" };
          const repeat = form.repeatOn ? repeatMap[form.repeatType] || "DAILY" : "NONE";
          const pickedTag =
            tagListRef.current.find((t) => t.id === form.tagId) ||
            tagListRef.current[0] || { name: "기본", color: "#B4BFFF" };
          const tagPayload = { name: pickedTag.name, color: getColorIndex(pickedTag.color) ?? 0 };
          const payload = {
            title: form.title || "제목 없음",
            content: form.title || "",
            start_datetime: toISO(form.startDate, form.startTime),
            end_datetime: toISO(form.endDate || form.startDate, form.endTime),
            all_day: !!form.allDay,
            repeat,
            until: form.repeatOn && form.repeatEnd ? toISO(form.repeatEnd, "00:00:00") : null,
            location: form.location || "",
            tag: tagPayload,
          };
          const res = await createEventApi(payload);
          try {
            const body = res?.data || res;
            const id = body?.id ?? res?.id;
            const startISO = body?.start_datetime ?? payload.start_datetime;
            const endISO = body?.end_datetime ?? payload.end_datetime;
            const dateKey = (startISO || "").slice(0, 10);
            const tagName = body?.tag?.name ?? res?.tag?.name ?? tagPayload.name;
            onCreated?.({
              id: id || Date.now(),
              date: dateKey,
              startDate: (startISO || "").slice(0, 10),
              endDate: (endISO || "").slice(0, 10),
              tag: tagName,
              tagColorIndex: tagPayload.color,
              title: payload.title,
              repeat: payload.repeat,
              until: (payload.until || "")?.slice?.(0, 10) || null,
            });
          } catch {}
          setOpenedFromAnalyze(false);
          onClose?.();
        } catch (e) {
          console.error("createEventApi (analyze->edit save) error", e);
        }
        return;
      }
      // 일반 수정: 상위 핸들러가 있으면 사용, 없으면 PATCH
      if (onSaveEdit) {
        onSaveEdit(form);
        return;
      }
      try {
        const toISO = (d, t) => {
          if (!d) return "";
          const time = (t || "00:00").padStart(5, "0");
          return `${d}T${time.length === 5 ? `${time}:00` : time}`;
        };
        const repeatMap = { daily: "DAILY", weekly: "WEEKLY", monthly: "MONTHLY", yearly: "YEARLY" };
        const repeat = form.repeatOn ? repeatMap[form.repeatType] || "DAILY" : "NONE";
        const pickedTag =
          tagListRef.current.find((t) => t.id === form.tagId) ||
          tagListRef.current[0] || { name: "기본", color: "#B4BFFF" };
        const tagPayload = {
          name: pickedTag.name,
          color: getColorIndex(pickedTag.color) ?? 0,
          calendar: currentEdit?.calendar ?? undefined,
        };
        const updateBody = {
          title: form.title || "제목 없음",
          content: form.title || "",
          start_datetime: (form.startDate || ""),
          end_datetime: (form.endDate || form.startDate || ""),
          start_time: toISO(form.startDate, form.startTime),
          end_time: toISO(form.endDate || form.startDate, form.endTime),
          all_day: !!form.allDay,
          repeat,
          location: form.location || "",
          tag: tagPayload,
        };
        if (currentEdit?.id) {
          await updateEventApi(currentEdit.id, updateBody);
        }
        onClose?.();
      } catch (e) {
        console.error("updateEventApi error", e);
      }
      return;
    }
    if (isManualReadOnly) {
      // 최종 확인 단계에서 서버로 등록 요청
      try {
        const form = collectFormData();
        const toISO = (d, t) => {
          if (!d) return "";
          const time = (t || "00:00").padStart(5, "0");
          // 초가 없으면 :00 붙임
          const iso = `${d}T${time.length === 5 ? `${time}:00` : time}`;
          return iso;
        };
        // repeat 매핑
        const repeatMap = {
          daily: "DAILY",
          weekly: "WEEKLY",
          monthly: "MONTHLY",
          yearly: "YEARLY",
        };
        const repeat =
          form.repeatOn ? repeatMap[form.repeatType] || "DAILY" : "NONE";

        // 태그 매핑(간이): 선택한 태그명이 없으면 기본값
        const pickedTag =
          tagListRef.current.find((t) => t.id === form.tagId) ||
          tagListRef.current[0] || { name: "기본", color: "#B4BFFF" };
        const tagPayload = {
          name: pickedTag.name,
          color: getColorIndex(pickedTag.color) ?? 0,
        };

        const payload = {
          title: form.title || "제목 없음",
          content: form.title || "",
          start_datetime: toISO(form.startDate, form.startTime),
          end_datetime: toISO(form.endDate || form.startDate, form.endTime),
          all_day: !!form.allDay,
          repeat,
          // 반복 종료일: 명세에 맞춰 ISO 문자열(자정)로 전달
          until:
            form.repeatOn && form.repeatEnd
              ? toISO(form.repeatEnd, "00:00:00")
              : null,
          location: form.location || "",
          tag: tagPayload,
        };
        const res = await createEventApi(payload);
        // 상위에 메인 캘린더 반영
        try {
          const body = res?.data || res; // 두 응답 포맷 대응
          const id = body?.id ?? res?.id;
          const startISO = body?.start_datetime ?? payload.start_datetime;
          const endISO = body?.end_datetime ?? payload.end_datetime;
          const dateKey = (startISO || "").slice(0, 10);
          const tagName =
            body?.tag?.name ??
            res?.tag?.name ??
            tagPayload.name;
          onCreated?.({
            id: id || Date.now(),
            date: dateKey,
            startDate: (startISO || "").slice(0,10),
            endDate: (endISO || "").slice(0,10),
            tag: tagName,
            tagColorIndex: tagPayload.color,
            title: payload.title,
            repeat: payload.repeat,
            until: (payload.until || "")?.slice?.(0,10) || null,
          });
        } catch {}
        console.log("createEventApi success");
        onClose?.();
      } catch (e) {
        console.error("createEventApi error", e);
        // 개발 환경에서는 낙관적 업데이트로 메인 캘린더에 반영해 개발 흐름을 유지
        if (import.meta.env?.DEV) {
          try {
            const form = collectFormData();
            const toISO = (d, t) => {
              if (!d) return "";
              const time = (t || "00:00").padStart(5, "0");
              return `${d}T${time.length === 5 ? `${time}:00` : time}`;
            };
            const startISO = toISO(form.startDate, form.startTime);
            const dateKey = (startISO || "").slice(0, 10);
            const pickedTag =
              tagListRef.current.find((t) => t.id === form.tagId) ||
              tagListRef.current[0] || { name: "기본" };
            onCreated?.({
              id: Date.now(),
              date: dateKey,
              startDate: form.startDate,
              endDate: form.endDate || form.startDate,
              tag: pickedTag.name,
              tagColorIndex: getColorIndex(pickedTag.color) ?? 0,
              title: form.title || "제목 없음",
              repeat: form.repeatOn ? (form.repeatType === "weekly" ? "WEEKLY" : "DAILY") : "NONE",
              until: form.repeatOn && form.repeatEnd ? form.repeatEnd : null,
            });
            onClose?.();
          } catch {}
        }
        // 실패 시 화면은 그대로 두어 수정 가능
      }
      return;
    }
    setManualConfirmed(true);
    setTagOpen(false);
    setAddingNewTag(false);
  };

  const handleSecondaryAction = () => {
    if (isEditMode) {
      if (openedFromAnalyze) {
        setOpenedFromAnalyze(false);
        onClose?.();
        return;
      }
      onDeleteEdit?.(currentEdit || collectFormData());
      return;
    }
    setManualConfirmed(false);
    setView("choice");
  };

  const showSecondaryButton = isEditMode || !isManualReadOnly;
  const primaryButtonLabel = isEditMode
    ? "저장하기"
    : isManualReadOnly
    ? "확인"
    : "등록하기";
  const secondaryButtonLabel = isEditMode ? "삭제하기" : "취소하기";

  const openManualConfirmationFromAI = () => {
    const ai = Array.isArray(aiLlmList) && aiLlmList.length ? aiLlmList[0] : null;
    const toDate = (iso) => (iso || "").slice(0, 10);
    const toTime = (iso) => {
      if (!iso) return "00:00";
      try {
        const d = new Date(iso);
        if (Number.isNaN(d.valueOf())) return "00:00";
        const hh = String(d.getHours()).padStart(2, "0");
        const mi = String(d.getMinutes()).padStart(2, "0");
        return `${hh}:${mi}`;
      } catch {
        return "00:00";
      }
    };
    setMode("create");
    setCurrentEdit(null);
    if (ai) {
      setTitle(ai.title || "일정을 입력해주세요");
      setStartDate(toDate(ai.start_datetime) || "");
      setEndDate(toDate(ai.end_datetime) || toDate(ai.start_datetime) || "");
      setStartTime(ai.all_day ? "00:00" : toTime(ai.start_datetime));
      setEndTime(ai.all_day ? "00:00" : toTime(ai.end_datetime || ai.start_datetime));
      setLocation(ai.location || "");
      setRepeatOn(false);
      setRepeatEnd("");
      setAllDay(!!ai.all_day);
      setSelectedTagId("t1");
    } else {
      setTitle("일정을 입력해주세요");
      setStartDate("");
      setEndDate("");
      setStartTime("00:00");
      setEndTime("00:00");
      setLocation("");
      setRepeatOn(false);
      setRepeatEnd("");
      setAllDay(false);
      setSelectedTagId("t1");
    }
    setManualConfirmed(true);
    setTagOpen(false);
    setAddingNewTag(false);
    setInternalAnalyzeOpen(false);
    setView("manual");
  };
  const openManualEditFromAI = () => {
    const ai = Array.isArray(aiLlmList) && aiLlmList.length ? aiLlmList[0] : null;
    const toDate = (iso) => (iso || "").slice(0, 10);
    const toTime = (iso) => {
      if (!iso) return "00:00";
      try {
        const d = new Date(iso);
        if (Number.isNaN(d.valueOf())) return "00:00";
        const hh = String(d.getHours()).padStart(2, "0");
        const mi = String(d.getMinutes()).padStart(2, "0");
        return `${hh}:${mi}`;
      } catch {
        return "00:00";
      }
    };
    setMode("edit");
    setOpenedFromAnalyze(true);
    setCurrentEdit({
      id: currentEdit?.id ?? null, // AI 결과에는 id가 없을 수 있음
      title: ai?.title || title || "일정을 입력해주세요",
      startDate: toDate(ai?.start_datetime) || startDate || "",
      endDate: toDate(ai?.end_datetime) || toDate(ai?.start_datetime) || endDate || "",
      startTime: ai?.all_day ? "00:00" : toTime(ai?.start_datetime),
      endTime: ai?.all_day ? "00:00" : toTime(ai?.end_datetime || ai?.start_datetime),
      location: ai?.location || location || "",
      allDay: !!ai?.all_day,
      tagId: "t1",
    });
    if (ai) {
      setTitle(ai.title || "일정을 입력해주세요");
      setStartDate(toDate(ai.start_datetime) || "");
      setEndDate(toDate(ai.end_datetime) || toDate(ai.start_datetime) || "");
      setStartTime(ai.all_day ? "00:00" : toTime(ai.start_datetime));
      setEndTime(ai.all_day ? "00:00" : toTime(ai.end_datetime || ai.start_datetime));
      setLocation(ai.location || "");
      setAllDay(!!ai.all_day);
      setSelectedTagId("t1");
    }
    setManualConfirmed(false);
    setTagOpen(false);
    setAddingNewTag(false);
    setInternalAnalyzeOpen(false);
    setView("manual");
  };
  return (
    <>
    <ModalBase open={open} onClose={onClose} title="" hideHeader closeOnOverlayClick widthPx={960} heightPx={modalHeightPx} noBodyPadding>
      <S.CloseFloating onClick={onClose} aria-label="close">×</S.CloseFloating>
      <S.Padding $upload={view === "upload"} $accent={isEditMode}>
        <S.Content>
          <S.TopLabel>
            {view === "choice" && "일정 등록하기"}
            {view === "upload" && "이미지 등록하기 (AI 인식)"}
          {view === "manual" && manualTitle}
          </S.TopLabel>

          {view === "choice" ? (
            <>
              <S.CardRow>
                <S.Card>
                  <S.Preview src={IMAGE_PREVIEW} alt="이미지 등록 미리보기" />
                </S.Card>
                <S.Card>
                  <S.Preview src={DIRECT_PREVIEW} alt="직접 등록 미리보기" />
                </S.Card>
              </S.CardRow>

              <S.BottomRow>
                <S.LargeButton onClick={() => setView("upload")}>이미지 등록하기 (AI 인식)</S.LargeButton>
                <S.LargeButton
                  onClick={() => {
                    setMode("create");
                    setCurrentEdit(null);
                    resetForm();
                    // 달력에서 클릭한 날짜가 있으면 기본값으로 세팅
                    try {
                      if (initialDate instanceof Date && !Number.isNaN(initialDate.valueOf())) {
                        const y = initialDate.getFullYear();
                        const m = String(initialDate.getMonth() + 1).padStart(2, "0");
                        const d = String(initialDate.getDate()).padStart(2, "0");
                        const dateStr = `${y}-${m}-${d}`;
                        setStartDate(dateStr);
                        setEndDate(dateStr);
                      }
                    } catch {}
                    setView("manual");
                  }}
                >
                  직접 등록하기
                </S.LargeButton>
              </S.BottomRow>
            </>
          ) : view === "upload" ? (
            <>
              <S.UploadWrap>
                {selectedImages.length === 0 ? (
                  <>
                    <S.UploadBox onClick={openFilePicker} style={{ cursor: 'pointer' }}>
                      <S.UploadInner>
                        <img src={UPLOAD_ICON} alt="upload" width={96} height={96} />
                      </S.UploadInner>
                    </S.UploadBox>
                    <S.UploadButton onClick={openFilePicker}>이미지 등록하기</S.UploadButton>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      style={{ display: 'none' }}
                      onChange={handleFilesSelected}
                    />
                  </>
                ) : (
                  <>
                    <S.Carousel>
                      <S.SideSlide
                        onClick={() => setCurrentImageIdx((idx) => (idx - 1 + selectedImages.length) % selectedImages.length)}
                        onDoubleClick={() => openFilePickerForReplace((currentImageIdx - 1 + selectedImages.length) % selectedImages.length)}
                      >
                        <img src={selectedImages[(currentImageIdx - 1 + selectedImages.length) % selectedImages.length].url} alt="prev" />
                      </S.SideSlide>
                      <S.MainSlide onClick={openFilePicker} onDoubleClick={() => openFilePickerForReplace(currentImageIdx)} style={{ cursor: 'pointer' }}>
                        <img src={selectedImages[currentImageIdx].url} alt={`selected-${currentImageIdx + 1}`} />
                      </S.MainSlide>
                      <S.SideSlide
                        onClick={() => setCurrentImageIdx((idx) => (idx + 1) % selectedImages.length)}
                        onDoubleClick={() => openFilePickerForReplace((currentImageIdx + 1) % selectedImages.length)}
                      >
                        <img src={selectedImages[(currentImageIdx + 1) % selectedImages.length].url} alt="next" />
                      </S.SideSlide>
                    </S.Carousel>
                    <S.Dots>
                      {selectedImages.map((_, i) => (
                        <S.Dot key={i} $active={i === currentImageIdx} />
                      ))}
                    </S.Dots>
                    <S.UploadButton
                      onClick={async () => {
                        const files = selectedImages.map((i) => i.file);
                        if (onOpenAI) {
                          onOpenAI(files);
                          return;
                        }
                        if (!files.length || analyzing) return;
                        setAnalyzing(true);
                        try {
                          const res = await taskProcessApi(files);
                          const taskId = res?.task_id ?? null;
                          const parsePost = () => {
                            const ocr = Array.isArray(res?.ocr_result) ? res.ocr_result : [];
                            const llm = Array.isArray(res?.llm_result) ? res.llm_result : [];
                            const recs = Array.isArray(res?.recommendation) ? res.recommendation : [];
                            return { ocr, llm, recs };
                          };
                          const parseGet = (getRes) => {
                            const root = getRes || {};
                            const payload = root?.data || root?.result || root || [];
                            const arr = Array.isArray(payload) ? payload : [];
                            let imageUrls = [];
                            let ocrList = [];
                            let llmList = [];
                            arr.forEach((item) => {
                              if (!item || typeof item !== "object") return;
                              if (Array.isArray(item.image_urls)) {
                                imageUrls = item.image_urls.filter(Boolean);
                              }
                              if (item.ocr_result) {
                                if (Array.isArray(item.ocr_result)) {
                                  ocrList = item.ocr_result;
                                } else if (typeof item.ocr_result === "string") {
                                  ocrList = item.ocr_result.split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
                                }
                              }
                              if (item.llm_result) {
                                try {
                                  const parsed = typeof item.llm_result === "string" ? JSON.parse(item.llm_result) : item.llm_result;
                                  if (Array.isArray(parsed)) llmList = parsed;
                                } catch {}
                              }
                            });
                            return { imageUrls, ocrList, llmList };
                          };
                          const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

                          let useOcr = parsePost().ocr;
                          let useLlm = parsePost().llm;
                          let useRecs = parsePost().recs;
                          let serverImageUrls = [];

                          if (taskId) {
                            // 짧게 재시도하며 GET으로 이미지 URL+최종 결과 수집
                            for (let i = 0; i < 3; i++) {
                              try {
                                const getRes = await taskGetApi(taskId);
                                const { imageUrls, ocrList, llmList } = parseGet(getRes);
                                if (imageUrls.length || ocrList.length || llmList.length) {
                                  if (imageUrls.length) serverImageUrls = imageUrls;
                                  if (ocrList.length) useOcr = ocrList;
                                  if (llmList.length) useLlm = llmList;
                                  break;
                                }
                              } catch {}
                              await sleep(400 * (i + 1));
                            }
                          }
                          setAiTaskId(taskId);
                          setAiOcrList(useOcr);
                          setAiLlmList(useLlm);
                          setAiRecommendations(useRecs);
                          const previewUrls =
                            (serverImageUrls && serverImageUrls.length ? serverImageUrls : selectedImages.map((i) => i.url).filter(Boolean));
                          setInternalAnalyzeImages(previewUrls);
                          setInternalAnalyzeOpen(true);
                        } catch (e) {
                          console.error("taskProcessApi error", e);
                          const msg =
                            e?.response?.data?.detail ||
                            e?.response?.data?.message ||
                            e?.message ||
                            "이미지 분석에 실패했어요. 다시 시도해 주세요.";
                          try { alert(msg); } catch {}
                        } finally {
                          setAnalyzing(false);
                        }
                      }}
                      disabled={analyzing}
                    >
                      {analyzing ? "분석 중..." : "이미지 등록하기"}
                    </S.UploadButton>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      style={{ display: 'none' }}
                      onChange={handleFilesSelected}
                    />
                  </>
                )}
              </S.UploadWrap>
            </>
          ) : (
            <>
              <S.FormWrap>
                <S.DateRow>
                  <S.DateFieldGroup>
                    <S.DateLabelBox>시작하는 날</S.DateLabelBox>
                    <S.DateInputBox>
                      <S.DateInput
                        type="date"
                        value={startDate}
                        onChange={(e) => {
                          if (isManualReadOnly) return;
                          setStartDate(e.target.value);
                        }}
                        disabled={isManualReadOnly}
                      />
                    </S.DateInputBox>
                    <S.DateLabelBox>끝나는 날</S.DateLabelBox>
                    <S.DateInputBox>
                      <S.DateInput
                        type="date"
                        value={endDate}
                        onChange={(e) => {
                          if (isManualReadOnly) return;
                          setEndDate(e.target.value);
                        }}
                        disabled={isManualReadOnly}
                      />
                    </S.DateInputBox>
                  </S.DateFieldGroup>
                </S.DateRow>
                <S.ScheduleRow>
                  <S.TextInput>
                    <S.InputEl
                      type="text"
                      placeholder="일정을 입력해 주세요!"
                      value={title}
                      maxLength={200}
                      onChange={(e) => {
                        if (isManualReadOnly) return;
                        setTitle(e.target.value);
                      }}
                      disabled={isManualReadOnly}
                    />
                  </S.TextInput>
                  <S.RepeatWrap>
                    <S.RepeatControlCard>
                      <S.RepeatControlHeader>
                        <S.RepeatControlTitle>
                          <S.RepeatControlIcon src={REPEAT_ICON} alt="반복 설정" />
                          반복 설정
                        </S.RepeatControlTitle>
                        <S.Toggle
                          aria-label="repeat-toggle"
                          onClick={() => {
                            if (isManualReadOnly) return;
                            setRepeatOn((v) => !v);
                          }}
                          $on={repeatOn}
                        >
                          <S.ToggleKnob $on={repeatOn} />
                        </S.Toggle>
                      </S.RepeatControlHeader>
                      {repeatOn && (
                        <S.RepeatControlBody>
                          <S.RepeatChipRow>
                            <S.RepeatChipSm
                              $active={repeatType === "daily"}
                              aria-pressed={repeatType === "daily"}
                              onClick={() => {
                                if (isManualReadOnly) return;
                                setRepeatType("daily");
                              }}
                            >
                              매일
                            </S.RepeatChipSm>
                           
                          </S.RepeatChipRow>
                          <S.RepeatEndRow>
                            <S.RepeatEndLabel>끝나는 날</S.RepeatEndLabel>
                            <S.MiniPill>
                              <S.MiniInputEl
                                type="date"
                                value={repeatEnd}
                                onChange={(e) => {
                                  if (isManualReadOnly) return;
                                  setRepeatEnd(e.target.value);
                                }}
                                disabled={isManualReadOnly}
                              />
                            </S.MiniPill>
                          </S.RepeatEndRow>
                        </S.RepeatControlBody>
                      )}
                    </S.RepeatControlCard>
                    <S.RepeatControlCard>
                      <S.RepeatControlHeader>
                        <S.RepeatControlTitle>
                          <S.RepeatControlIcon src={ALLDAY_ICON} alt="하루 종일" />
                          하루 종일
                        </S.RepeatControlTitle>
                        <S.Toggle
                          aria-label="allday-toggle"
                          onClick={() => {
                            if (isManualReadOnly) return;
    setAllDay((v) => {
      const next = !v;
      if (next) {
        setStartTime("00:00");
        setEndTime("00:00");
      }
      return next;
    });
                          }}
                          $on={allDay}
                        >
                          <S.ToggleKnob $on={allDay} />
                        </S.Toggle>
                      </S.RepeatControlHeader>
                      {repeatOn && (
                        <S.RepeatControlBody>
                          <S.RepeatChipRow>
                            <S.RepeatChipSm
                              $active={repeatType === "weekly"}
                              aria-pressed={repeatType === "weekly"}
                              onClick={() => {
                                if (isManualReadOnly) return;
                                setRepeatType("weekly");
                              }}
                            >
                              매주
                            </S.RepeatChipSm>
                          </S.RepeatChipRow>
                          <S.RepeatEndRow>
                            <S.RepeatEndLabel>끝나는 날</S.RepeatEndLabel>
                            <S.MiniPill>
                              <S.MiniInputEl
                                type="date"
                                value={repeatEnd}
                                onChange={(e) => {
                                  if (isManualReadOnly) return;
                                  setRepeatEnd(e.target.value);
                                }}
                                disabled={isManualReadOnly}
                              />
                            </S.MiniPill>
                          </S.RepeatEndRow>
                        </S.RepeatControlBody>
                      )}
                    </S.RepeatControlCard>
                  </S.RepeatWrap>
                </S.ScheduleRow>
                <S.MetaRow>
                  <S.MetaColumn>
                    <S.MetaField>
                      <S.SmallChip>태그</S.SmallChip>
                    <S.TagSelect>
                        <S.TagButton
                        ref={tagButtonRef}
                          onClick={() => {
                            if (isManualReadOnly) return;
                            setTagOpen((v) => !v);
                            setAddingNewTag(false);
                          }}
                        >
                          {tagList.find((t) => t.id === selectedTagId)?.name || "태그 설정하기"}
                          <S.Caret />
                        </S.TagButton>
                      {/* 기존 메뉴는 overflow 영향을 받으므로 포털로 띄움 */}
                      {tagOpen && !isManualReadOnly && createPortal(
                        <S.TagMenuFloating style={{ top: `${tagMenuPos.top}px`, left: `${tagMenuPos.left}px` }}>
                            <S.TagMenuHeader>태그 설정하기</S.TagMenuHeader>
                            {tagList.map((t) => (
                              <S.TagRow
                                key={t.id}
                                onClick={() => {
                                  setSelectedTagId(t.id);
                                  setAddingNewTag(false);
                                setTagOpen(false);
                                }}
                              >
                                <S.TagRowLeft>
                                  <S.Swatch $color={t.color} />
                                  {t.name}
                                </S.TagRowLeft>
                                <S.Radio $active={selectedTagId === t.id} />
                              </S.TagRow>
                            ))}
                            {tagList.length < MAX_TAGS && (
                              <S.TagAddRow
                                onClick={() => {
                                  setAddingNewTag(true);
                                  setSelectedTagId("");
                                  setNewTagName("");
                                  setNewTagColor("#E3E8FF");
                                }}
                              >
                                <S.TagRowLeft>
                                  <S.Swatch $color="#ffffff" />
                                  태그 추가하기
                                </S.TagRowLeft>
                                <S.Radio $active={false} />
                              </S.TagAddRow>
                            )}
                            {addingNewTag && (
                              <>
                                <S.Palette>
                                  <ColorChip
                                    onSelect={(c) => {
                                        setNewTagColor(c);
                                      }}
                                    />
                                </S.Palette>
                                <S.TagNameRow>
                                  <S.SmallInput style={{ width: "100%" }}>
                                    <S.InputEl
                                      type="text"
                                      placeholder="태그를 입력해주세요."
                                      value={newTagName}
                                      onChange={(e) => setNewTagName(e.target.value)}
                                      onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                          const name = newTagName.trim();
                                          if (!name) return;
                                          const newId = `t${Date.now()}`;
                                          setTagList([...tagList, { id: newId, name, color: newTagColor }]);
                                          setSelectedTagId(newId);
                                          setNewTagName("");
                                          setAddingNewTag(false);
                                        setTagOpen(false);
                                        }
                                      }}
                                    />
                                  </S.SmallInput>
                                </S.TagNameRow>
                              </>
                            )}
                        </S.TagMenuFloating>,
                        document.body
                      )}
                      </S.TagSelect>
                    </S.MetaField>
                    <S.MetaField>
                      <S.SmallChip>장소</S.SmallChip>
                      <S.SmallInput>
                        <S.InputEl
                          type="text"
                          placeholder="장소 입력하기"
                          value={location}
                          onChange={(e) => {
                            if (isManualReadOnly) return;
                            setLocation(e.target.value);
                          }}
                          disabled={isManualReadOnly}
                        />
                      </S.SmallInput>
                    </S.MetaField>
                  </S.MetaColumn>
                  <S.MetaColumn>
                    <S.MetaField>
                      <S.TimeChip>시작하는 시간</S.TimeChip>
                      <S.TimeEl
                        type="time"
                        value={startTime}
                        onChange={(e) => {
                          if (isManualReadOnly) return;
                          setStartTime(e.target.value);
                        }}
                        disabled={allDay || isManualReadOnly}
                      />
                    </S.MetaField>
                    <S.MetaField>
                      <S.TimeChip>끝나는 시간</S.TimeChip>
                      <S.TimeEl
                        type="time"
                        value={endTime}
                        onChange={(e) => {
                          if (isManualReadOnly) return;
                          setEndTime(e.target.value);
                        }}
                        disabled={allDay || isManualReadOnly}
                      />
                    </S.MetaField>
                  </S.MetaColumn>
                </S.MetaRow>
                <S.ActionsRow $single={isManualReadOnly && !isEditMode}>
                  {showSecondaryButton && (
                    <S.WideButton onClick={handleSecondaryAction}>
                      {secondaryButtonLabel}
                    </S.WideButton>
                  )}
                  <S.WideButton onClick={handlePrimaryAction}>
                    {primaryButtonLabel}
                  </S.WideButton>
                </S.ActionsRow>
              </S.FormWrap>
            </>
          )}
        </S.Content>
      </S.Padding>
    </ModalBase>
    {internalAnalyzeOpen && (
      <AnalyzeModal
        open={internalAnalyzeOpen}
        images={internalAnalyzeImages}
        ocrList={aiOcrList}
        llmList={aiLlmList}
        recommendations={aiRecommendations}
        onClose={() => setInternalAnalyzeOpen(false)}
        onReupload={() => { setInternalAnalyzeOpen(false); setView("upload"); }}
        onEdit={openManualEditFromAI}
        onSubmit={openManualConfirmationFromAI}
      />
    )}
    </>
  );
}

export default RegisterModal;
