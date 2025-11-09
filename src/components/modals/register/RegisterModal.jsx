import React, { useEffect, useState, useRef, useCallback } from "react";
import ModalBase from "../ModalBase";
import AnalyzeModal from "../analysis/AnalyzeModal";
import * as S from "./RegisterModal.style";
import IMAGE_PREVIEW from "@/assets/modal/Image.svg";
import DIRECT_PREVIEW from "@/assets/modal/Direct.svg";
import UPLOAD_ICON from "@/assets/modal/img.svg";
import REPEAT_ICON from "@/assets/modal/repeat.svg";
import ALLDAY_ICON from "@/assets/modal/allday.svg";

function RegisterModal({
  open,
  onClose,
  onOpenAI,
  onOpenManual,
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
    { id: "t1", name: "개인 일정", color: "#FFE28C" },
    { id: "t2", name: "개인 일정", color: "#E0C3FF" },
    { id: "t3", name: "개인 일정", color: "#A6D8FF" },
    { id: "t4", name: "운동하기", color: "#C8E9FF" },
  ]);
  const tagListRef = useRef(tagList);
  const COLOR_OPTIONS = [
    "#5E81F4","#7E8DF5","#A6D8FF","#C8E9FF","#FFE28C","#FFD966","#FFAFCC","#E0C3FF",
    "#B3F5D0","#9AE6B4","#FFD1DC","#FFDEA0","#90CDF4","#63B3ED","#CBD5E0","#A0AEC0"
  ];
  const MAX_TAGS = 5;
  const [newTagName, setNewTagName] = useState("");
  const [newTagColor, setNewTagColor] = useState("#E3E8FF");
  const [addingNewTag, setAddingNewTag] = useState(false);
  const [manualConfirmed, setManualConfirmed] = useState(false);
  const [mode, setMode] = useState("create"); // create | edit
  const [currentEdit, setCurrentEdit] = useState(null);

  const isEditMode = mode === "edit";

  // 이미지 업로드 및 슬라이더 상태
  const [selectedImages, setSelectedImages] = useState([]); // [{file, url}]
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const fileInputRef = useRef(null);
  const replaceIdxRef = useRef(null);

  // 내부 분석 모달 (부모에서 onOpenAI를 넘기지 않은 경우 대비)
  const [internalAnalyzeOpen, setInternalAnalyzeOpen] = useState(false);
  const [internalAnalyzeImages, setInternalAnalyzeImages] = useState([]); // string URLs

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

  const handlePrimaryAction = () => {
    if (isEditMode) {
      onSaveEdit?.(collectFormData());
      return;
    }
    if (isManualReadOnly) {
      onOpenManual?.();
      return;
    }
    setManualConfirmed(true);
    setTagOpen(false);
    setAddingNewTag(false);
  };

  const handleSecondaryAction = () => {
    if (isEditMode) {
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
    setMode("create");
    setCurrentEdit(null);
    setTitle("일정을 입력해주세요");
    setStartDate("2025-10-26");
    setEndDate("2025-10-26");
    setStartTime("00:00");
    setEndTime("00:00");
    setLocation("회의실");
    setRepeatOn(false);
    setRepeatEnd("");
    setAllDay(false);
    setSelectedTagId("t1");
    setManualConfirmed(true);
    setTagOpen(false);
    setAddingNewTag(false);
    setInternalAnalyzeOpen(false);
    setView("manual");
  };
  return (
    <>
    <ModalBase open={open} onClose={onClose} title="" hideHeader closeOnOverlayClick widthPx={960} heightPx={modalHeightPx} noBodyPadding>
      <S.CloseFloating onClick={onClose} aria-label="close">×</S.CloseFloating>
      <S.Padding $upload={view === "upload"}>
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
                      onClick={() => {
                        const files = selectedImages.map((i) => i.file);
                        if (onOpenAI) {
                          onOpenAI(files);
                        } else {
                          // 내부 분석 모달 오픈 (이미 생성된 object URL 사용)
                          setInternalAnalyzeImages(selectedImages.map((i) => i.url).filter(Boolean));
                          setInternalAnalyzeOpen(true);
                        }
                      }}
                    >
                      이미지 등록하기
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
                    <S.TextArea
                      placeholder="일정을 입력해 주세요!"
                      value={title}
                      maxLength={200}
                      rows={2}
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
                
                <S.FormRow style={{ justifyContent: "space-between" }}>
                  <div style={{ display: "flex", gap: "0.6vw", flexDirection: 'column', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6vw' }}>
                      <S.SmallChip>태그</S.SmallChip>
                      <S.TagSelect>
                      <S.TagButton
                        onClick={() => {
                          if (isManualReadOnly) return;
                          setTagOpen((v) => !v);
                          setAddingNewTag(false);
                        }}
                      >
                          {tagList.find((t) => t.id === selectedTagId)?.name || '태그 설정하기'}
                          <S.Caret />
                        </S.TagButton>
                        {tagOpen && !isManualReadOnly && (
                          <S.TagMenu>
                          <S.TagMenuHeader>태그 설정하기</S.TagMenuHeader>
                          {tagList.map((t) => (
                            <S.TagRow key={t.id} onClick={() => { setSelectedTagId(t.id); setAddingNewTag(false); }}>
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
                                {COLOR_OPTIONS.map((c) => (
                                  <S.ColorDot
                                    key={c}
                                    $color={c}
                                    $active={newTagColor === c}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setNewTagColor(c);
                                    }}
                                  />
                                ))}
                              </S.Palette>
                              <S.TagNameRow>
                                <S.SmallInput style={{ width: '100%' }}>
                                <S.InputEl
                                    type="text"
                                    placeholder="태그를 입력해주세요."
                                    value={newTagName}
                                    onChange={(e) => setNewTagName(e.target.value)}
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter') {
                                        const name = newTagName.trim();
                                        if (!name) return;
                                        const newId = `t${Date.now()}`;
                                        setTagList([...tagList, { id: newId, name, color: newTagColor }]);
                                        setSelectedTagId(newId);
                                        setNewTagName("");
                                        setAddingNewTag(false);
                                      }
                                    }}
                                  />
                                </S.SmallInput>
                              </S.TagNameRow>
                            </>
                          )}
                          </S.TagMenu>
                        )}
                      </S.TagSelect>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6vw' }}>
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
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.6vw', width: '100%' }}>
                    <S.TimeWrap>
                      <S.TimeCol>
                        <S.InlineRow>
                          <S.Label>시작</S.Label>
                          <S.TimeEl
                            type="time"
                            value={startTime}
                            onChange={(e) => {
                              if (isManualReadOnly) return;
                              setStartTime(e.target.value);
                            }}
                            disabled={allDay || isManualReadOnly}
                          />
                        </S.InlineRow>
                      </S.TimeCol>
                      <S.TimeCol>
                        <S.InlineRow>
                          <S.Label>종료</S.Label>
                          <S.TimeEl
                            type="time"
                            value={endTime}
                            onChange={(e) => {
                              if (isManualReadOnly) return;
                              setEndTime(e.target.value);
                            }}
                            disabled={allDay || isManualReadOnly}
                          />
                        </S.InlineRow>
                      </S.TimeCol>
                    </S.TimeWrap>
                  </div>
                </S.FormRow>
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
        onClose={() => setInternalAnalyzeOpen(false)}
        onReupload={() => { setInternalAnalyzeOpen(false); setView("upload"); }}
        onEdit={() => {
          setInternalAnalyzeOpen(false);
          setManualConfirmed(false);
          setView("manual");
        }}
        onSubmit={openManualConfirmationFromAI}
      />
    )}
    </>
  );
}

export default RegisterModal;
