import React, { useEffect, useState, useRef } from "react";
import ModalBase from "../ModalBase";
import * as S from "./RegisterModal.style";
import IMAGE_PREVIEW from "@/assets/modal/Image.svg";
import DIRECT_PREVIEW from "@/assets/modal/Direct.svg";
import UPLOAD_ICON from "@/assets/modal/img.svg";

function RegisterModal({ open, onClose, onOpenAI, onOpenManual }) {
  const [view, setView] = useState("choice"); // choice | upload | manual
  // manual form state
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [location, setLocation] = useState("");
  const [startTime, setStartTime] = useState("00:00");
  const [endTime, setEndTime] = useState("00:00");
  const [repeatOn, setRepeatOn] = useState(false);
  const [repeatType, setRepeatType] = useState("daily"); // daily | weekly
  const [repeatEnd, setRepeatEnd] = useState("");
  const [repeatWeekday, setRepeatWeekday] = useState("월");
  const [tagOpen, setTagOpen] = useState(false);
  const [selectedTagId, setSelectedTagId] = useState("");
  const [tagList, setTagList] = useState([
    { id: "t1", name: "개인 일정", color: "#FFE28C" },
    { id: "t2", name: "개인 일정", color: "#E0C3FF" },
    { id: "t3", name: "개인 일정", color: "#A6D8FF" },
    { id: "t4", name: "운동하기", color: "#C8E9FF" },
  ]);
  const COLOR_OPTIONS = [
    "#5E81F4","#7E8DF5","#A6D8FF","#C8E9FF","#FFE28C","#FFD966","#FFAFCC","#E0C3FF",
    "#B3F5D0","#9AE6B4","#FFD1DC","#FFDEA0","#90CDF4","#63B3ED","#CBD5E0","#A0AEC0"
  ];
  const [editingTagName, setEditingTagName] = useState("");
  const MAX_TAGS = 5;
  const [newTagName, setNewTagName] = useState("");
  const [newTagColor, setNewTagColor] = useState("#E3E8FF");
  const [addingNewTag, setAddingNewTag] = useState(false);

  // 이미지 업로드 및 슬라이더 상태
  const [selectedImages, setSelectedImages] = useState([]); // [{file, url}]
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const fileInputRef = useRef(null);
  const replaceIdxRef = useRef(null);

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
    // 자동 이동: 첫 업로드 직후 바로 분석 모달 열기
    if (wasEmpty && finalImages.length > 0 && onOpenAI) {
      onOpenAI(finalImages.map((i) => i.file));
    }
    // allow selecting the same file again later
    if (e.target) try { e.target.value = ""; } catch {}
  };

  // 모달이 열릴 때마다 초기 화면으로 리셋 (업로드 가이드가 다른 화면에 보이지 않도록)
  useEffect(() => {
    if (open) {
      setView("choice");
      // 초기화
      setSelectedImages([]);
      setCurrentImageIdx(0);
    }
  }, [open]);
  const modalHeightPx = view === "manual" ? (repeatOn ? 740 : 600) : 600;
  return (
    <ModalBase open={open} onClose={onClose} title="" hideHeader closeOnOverlayClick widthPx={960} heightPx={modalHeightPx} noBodyPadding>
      <S.CloseFloating onClick={onClose} aria-label="close">×</S.CloseFloating>
      <S.Padding>
        <S.Content>
          <S.TopLabel>
            {view === "choice" && "일정 등록하기"}
            {view === "upload" && "이미지 등록하기 (AI 인식)"}
            {view === "manual" && "직접 일정 등록하기"}
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
                <S.LargeButton onClick={() => setView("manual")}>직접 등록하기</S.LargeButton>
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
                    <S.UploadButton onClick={() => onOpenAI && onOpenAI(selectedImages.map((i) => i.file))}>이미지 등록하기</S.UploadButton>
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
                <S.FormRow>
                  <S.Label>시작하는 날</S.Label>
                  <S.Pill>
                    <S.InputEl type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                  </S.Pill>
                  <S.Label>끝나는 날</S.Label>
                  <S.Pill>
                    <S.InputEl type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                  </S.Pill>
                </S.FormRow>
                <S.FormRow style={{ justifyContent: "space-between" }}>
                  <S.TextInput>
                    <S.InputEl
                      type="text"
                      placeholder="일정을 입력해 주세요!"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </S.TextInput>
                  <S.RepeatWrap>
                    <S.RepeatLabel>반복 설정</S.RepeatLabel>
                    <S.InlineRow>
                      <S.Toggle aria-label="repeat-toggle" onClick={() => setRepeatOn((v) => !v)} $on={repeatOn}>
                        <S.ToggleKnob $on={repeatOn} />
                      </S.Toggle>
                      <S.MutedText>{repeatOn ? "반복 설정 켜짐" : "반복 설정 안함"}</S.MutedText>
                    </S.InlineRow>
                    {repeatOn && (
                      <>
                        <S.OptionGroup>
                          <S.OptionBtn $active={repeatType === "daily"} onClick={() => setRepeatType("daily")}>매일</S.OptionBtn>
                          <S.OptionBtn $active={repeatType === "weekly"} onClick={() => setRepeatType("weekly")}>매주</S.OptionBtn>
                        </S.OptionGroup>
                        <S.InlineRow>
                          <S.Label>끝나는 날</S.Label>
                          <S.Pill style={{ minWidth: "unset" }}>
                            <S.InputEl type="date" value={repeatEnd} onChange={(e) => setRepeatEnd(e.target.value)} />
                          </S.Pill>
                          {repeatType === "weekly" && (
                            <>
                              <S.Label>요일</S.Label>
                              <S.Pill style={{ minWidth: "unset" }}>
                                <S.SelectEl value={repeatWeekday} onChange={(e) => setRepeatWeekday(e.target.value)}>
                                  {['일','월','화','수','목','금','토'].map((d) => (
                                    <option key={d} value={d}>{d}</option>
                                  ))}
                                </S.SelectEl>
                              </S.Pill>
                            </>
                          )}
                        </S.InlineRow>
                      </>
                    )}
                  </S.RepeatWrap>
                </S.FormRow>
                <S.FormRow style={{ justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6vw" }}>
                    <S.SmallChip>태그</S.SmallChip>
                    <S.TagSelect>
                      <S.TagButton onClick={() => { setTagOpen((v) => !v); setAddingNewTag(false); }}>
                        {tagList.find((t) => t.id === selectedTagId)?.name || '태그 설정하기'}
                        <S.Caret />
                      </S.TagButton>
                      {tagOpen && (
                        <S.TagMenu>
                          <S.TagMenuHeader>태그 설정하기</S.TagMenuHeader>
                          {tagList.map((t) => (
                            <S.TagRow key={t.id} onClick={() => { setSelectedTagId(t.id); setTag(t.name); setEditingTagName(t.name); setAddingNewTag(false); }}>
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
                                        setTag(name);
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
                  <S.TimeWrap>
                    <S.TimeCol>
                      <S.MeridiemCol>
                        <div>AM</div>
                        <div>PM</div>
                      </S.MeridiemCol>
                      <S.TimeEl type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                    </S.TimeCol>
                    <S.TimeCol>
                      <S.MeridiemCol>
                        <div>AM</div>
                        <div>PM</div>
                      </S.MeridiemCol>
                      <S.TimeEl type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                    </S.TimeCol>
                  </S.TimeWrap>
                </S.FormRow>
                <S.FormRow style={{ justifyContent: "flex-start", gap: "0.6vw" }}>
                  <S.SmallChip>장소</S.SmallChip>
                  <S.SmallInput>
                    <S.InputEl
                      type="text"
                      placeholder="장소 입력하기"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </S.SmallInput>
                </S.FormRow>
                <S.ActionsRow>
                  <S.WideButton onClick={() => setView("choice")}>취소하기</S.WideButton>
                  <S.WideButton onClick={onOpenManual}>등록하기</S.WideButton>
                </S.ActionsRow>
              </S.FormWrap>
            </>
          )}
        </S.Content>
      </S.Padding>
    </ModalBase>
  );
}

export default RegisterModal;
