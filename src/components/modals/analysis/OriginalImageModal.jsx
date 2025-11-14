import React, { useMemo, useState, useEffect, useRef } from "react";
import ModalBase from "../ModalBase";
import * as S from "./OriginalImageModal.style";

function OriginalImageModal({
  open,
  onClose,
  onConfirm,
  images = [],
  ocrList = [],
  llmList = [],
  recommendations = [],
}) {
  const primaryLlm =
    Array.isArray(llmList) && llmList.length > 0 ? llmList[0] : null;
  const formatDate = (iso) => {
    if (!iso) return "";
    try {
      const d = new Date(iso);
      if (Number.isNaN(d.valueOf())) return "";
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      return `${yyyy}.${mm}.${dd}`;
    } catch {
      return "";
    }
  };
  const formatTime = (iso) => {
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

  const createdUrlsRef = useRef([]);
  const sanitizedImages = useMemo(() => {
    const list = Array.isArray(images) ? images : [];
    createdUrlsRef.current.forEach((u) => { try { URL.revokeObjectURL(u); } catch {} });
    createdUrlsRef.current = [];
    const converted = list
      .map((item) => {
        if (!item) return null;
        if (typeof item === "string") return item;
        if (item instanceof File) {
          const url = URL.createObjectURL(item);
          createdUrlsRef.current.push(url);
          return url;
        }
        if (typeof item === "object" && typeof item.url === "string") return item.url;
        return null;
      })
      .filter(Boolean);
    return converted;
  }, [images]);

  useEffect(() => {
    return () => {
      createdUrlsRef.current.forEach((u) => { try { URL.revokeObjectURL(u); } catch {} });
      createdUrlsRef.current = [];
    };
  }, []);

  const [currentIdx, setCurrentIdx] = useState(0);
  useEffect(() => {
    if (currentIdx >= sanitizedImages.length) setCurrentIdx(0);
  }, [sanitizedImages.length]);

  return (
    <ModalBase open={open} onClose={onClose} title="" hideHeader closeOnOverlayClick widthPx={1280} heightPx={980} noBodyPadding noScroll>
      <S.CloseFloating onClick={onClose} aria-label="close">×</S.CloseFloating>
      <S.Padding>
        <S.TopLabel>원본 이미지 확인</S.TopLabel>
        <S.Layout>
          <S.LeftCol>
            <S.CardBox>
              <S.CardTop>OCR 추출 결과</S.CardTop>
              <S.OcrBox>
                <S.OcrList>
                  {(Array.isArray(ocrList) && ocrList.length ? ocrList : ["분석 결과가 없습니다."]).map((t, i) => (
                    <S.OcrItem key={i}>{t}</S.OcrItem>
                  ))}
                </S.OcrList>
              </S.OcrBox>
            </S.CardBox>

            <S.CardBox>
              <S.CardTop>AI 앤디가 인식한 일정</S.CardTop>
              <S.AiBox>
                <S.FieldRow>
                  <S.Chip>제목</S.Chip>
                  <S.Pill>{primaryLlm?.title || "일정을 입력해주세요"}</S.Pill>
                </S.FieldRow>
                <S.FieldRow>
                  <S.Chip>날짜</S.Chip>
                  <S.Pill>{formatDate(primaryLlm?.start_datetime) || "-"}</S.Pill>
                </S.FieldRow>
                <S.FieldRow>
                  <S.Chip>시간</S.Chip>
                  <S.Pill>
                    {primaryLlm?.all_day
                      ? "하루 종일"
                      : `${formatTime(primaryLlm?.start_datetime)} ~ ${formatTime(primaryLlm?.end_datetime)}`}
                  </S.Pill>
                </S.FieldRow>
                <S.FieldRow>
                  <S.Chip>장소</S.Chip>
                  <S.Pill>{primaryLlm?.location || "-"}</S.Pill>
                </S.FieldRow>
              </S.AiBox>
            </S.CardBox>
          </S.LeftCol>

          <S.PreviewWrap>
            <S.PreviewArea $hasImage={sanitizedImages.length > 0}>
              {sanitizedImages.length > 0 ? (
                <img
                  src={sanitizedImages[currentIdx]}
                  alt={`preview-${currentIdx + 1}`}
                  style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
                />
              ) : null}
            </S.PreviewArea>
            <S.CarouselBar>
              {(sanitizedImages.length ? sanitizedImages : [0]).map((_, i) => (
                <S.Dot key={i} $active={i === currentIdx} onClick={() => sanitizedImages.length && setCurrentIdx(i)} />
              ))}
            </S.CarouselBar>
            {sanitizedImages.length > 1 && (
              <S.ArrowRow>
                <span onClick={() => setCurrentIdx((i) => (i - 1 + sanitizedImages.length) % sanitizedImages.length)} style={{ cursor: "pointer" }}>‹</span>
                <span onClick={() => setCurrentIdx((i) => (i + 1) % sanitizedImages.length)} style={{ cursor: "pointer" }}>›</span>
              </S.ArrowRow>
            )}
          </S.PreviewWrap>

          <S.BottomCenter>
            <S.Confirm onClick={onConfirm || onClose}>확인</S.Confirm>
          </S.BottomCenter>
        </S.Layout>
      </S.Padding>
    </ModalBase>
  );
}

export default OriginalImageModal;



