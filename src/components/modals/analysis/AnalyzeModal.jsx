import React, { useMemo, useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { vw } from "@/utils/units";
import ModalBase from "../ModalBase";
import * as S from "./AnalyzeModal.style";

// AnalyzeModal 전용 오버라이드 (OriginalImageModal에는 영향 없음)
const LayoutSm = styled(S.Layout)`
  grid-template-rows: 1fr auto;            /* 상단(이미지+좌측정보) 영역을 충분히 확보 */
  row-gap: ${vw(24)};
`;
const LeftColSm = styled(S.LeftCol)`
  gap: ${vw(16)};
  margin-top: ${vw(60)};
`;
const OcrBoxSm = styled(S.OcrBox)`
  max-width: ${vw(360)};
  min-height: ${vw(170)};
  padding: ${vw(16)} ${vw(20)};
  gap: ${vw(8)};
`;
const AiBoxSm = styled(S.AiBox)`
  max-width: ${vw(360)};
  min-height: ${vw(160)};
  padding: ${vw(14)} ${vw(20)} ${vw(10)};
  gap: ${vw(8)};
`;
const OcrItemSm = styled(S.OcrItem)`
  font-size: ${vw(15)};
  line-height: 1.4;
  &:before {
    width: ${vw(6)};
    height: ${vw(6)};
  }
`;
const ChipSm = styled(S.Chip)`
  height: ${vw(26)};
  min-width: ${vw(52)};
  font-weight: 800;
  font-size: ${vw(14)};
`;
const PillSm = styled(S.Pill)`
  height: ${vw(24)};
  font-size: ${vw(14)};
`;
const PreviewWrapSm = styled(S.PreviewWrap)`
  margin-top: ${vw(60)};
  margin-bottom: ${vw(35)};
  padding: ${vw(18)};
  justify-content: space-between;
`;

function AnalyzeModal({ open, onClose, onReupload, onEdit, onSubmit, images = [] }) {
  const ocrSamples = [
    "10월 24일 오후 2시 회의 있음",
    "10월 24일 오후 2시 회의 있음",
    "10월 24일 오후 2시 회의 있음",
    "10월 24일 오후 2시 회의 있음",
    "10월 24일 오후 2시 회의 있음",
  ];

  // 이미지 입력은 string URL[], File[], 혹은 { url: string }[] 모두 지원
  const createdUrlsRef = useRef([]);
  const sanitizedImages = useMemo(() => {
    const list = Array.isArray(images) ? images : [];
    // 이전에 생성한 URL 정리
    createdUrlsRef.current.forEach((u) => { try { URL.revokeObjectURL(u); } catch {} });
    createdUrlsRef.current = [];
    const converted = list
      .map((item) => {
        if (!item) return null;
        if (typeof item === 'string') return item;
        if (item instanceof File) {
          const url = URL.createObjectURL(item);
          createdUrlsRef.current.push(url);
          return url;
        }
        if (typeof item === 'object' && typeof item.url === 'string') return item.url;
        return null;
      })
      .filter(Boolean);
    return converted;
  }, [images]);
  // 컴포넌트 언마운트 시 생성 URL 정리
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
        <S.TopLabel>이미지 분석 결과</S.TopLabel>
        <LayoutSm>
          {/* Left column (stacked sections) */}
          <LeftColSm>
            <S.CardBox>
              <S.CardTop>OCR 추출 결과</S.CardTop>
              <OcrBoxSm>
                <S.OcrList>
                  {ocrSamples.map((t, i) => (
                    <OcrItemSm key={i}>{t}</OcrItemSm>
                  ))}
                </S.OcrList>
              </OcrBoxSm>
            </S.CardBox>


              <S.CardBox>
              <S.CardTop>AI 앤디가 인식한 일정</S.CardTop>
              <AiBoxSm>
                <S.FieldRow>
                  <ChipSm>제목</ChipSm>
                  <PillSm>일정을 입력해주세요</PillSm>
                </S.FieldRow>
                <S.FieldRow>
                  <ChipSm>날짜</ChipSm>
                  <PillSm>2025.10.26</PillSm>
                </S.FieldRow>
                <S.FieldRow>
                  <ChipSm>시간</ChipSm>
                  <PillSm>00:00</PillSm>
                </S.FieldRow>
                <S.FieldRow>
                  <ChipSm>장소</ChipSm>
                  <PillSm>회의실</PillSm>
                </S.FieldRow>
              </AiBoxSm>
              </S.CardBox>

          </LeftColSm>

          {/* Preview center */}
          <PreviewWrapSm>
            <S.PreviewArea $hasImage={sanitizedImages.length > 0}>
              {sanitizedImages.length > 0 ? (
                <img
                  src={sanitizedImages[currentIdx]}
                  alt={`preview-${currentIdx + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
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
                <span onClick={() => setCurrentIdx((i) => (i - 1 + sanitizedImages.length) % sanitizedImages.length)} style={{ cursor: 'pointer' }}>‹</span>
                <span onClick={() => setCurrentIdx((i) => (i + 1) % sanitizedImages.length)} style={{ cursor: 'pointer' }}>›</span>
              </S.ArrowRow>
            )}
          </PreviewWrapSm>

          {/* Bottom-left recommendations spanning left + center */}
          <S.BottomLeft>
            <S.CardBox>
              <S.BottomCardTop>AI앤디의 일정 대안 추천</S.BottomCardTop>
              <S.BottomCardBody>
                <S.CardsRow>
                  <S.SuggestCard>
                    <S.SuggestTitle>이 시간을 추천해요!</S.SuggestTitle>
                    <S.SuggestBody>
                      <S.Meta>
                        <S.MetaLabel>날짜</S.MetaLabel><div>2025.10.26</div>
                        <S.MetaLabel>시간</S.MetaLabel><div>00:00</div>
                        <S.MetaLabel>장소</S.MetaLabel><div>회의실</div>
                      </S.Meta>
                    </S.SuggestBody>
                  </S.SuggestCard>
                  <S.SuggestCard>
                    <S.SuggestTitle>이런 날짜는 어때요?</S.SuggestTitle>
                    <S.SuggestBody>
                      <S.Meta>
                        <S.MetaLabel>날짜</S.MetaLabel><div>2025.10.26</div>
                        <S.MetaLabel>시간</S.MetaLabel><div>00:00</div>
                        <S.MetaLabel>장소</S.MetaLabel><div>회의실</div>
                      </S.Meta>
                    </S.SuggestBody>
                  </S.SuggestCard>
                  <S.SuggestCard>
                    <S.SuggestTitle>이 시간은 어떠신가요?</S.SuggestTitle>
                    <S.SuggestBody>
                      <S.Meta>
                        <S.MetaLabel>날짜</S.MetaLabel><div>2025.10.26</div>
                        <S.MetaLabel>시간</S.MetaLabel><div>00:00</div>
                        <S.MetaLabel>장소</S.MetaLabel><div>회의실</div>
                      </S.Meta>
                    </S.SuggestBody>
                  </S.SuggestCard>
                </S.CardsRow>
              </S.BottomCardBody>
            </S.CardBox>
          </S.BottomLeft>

          {/* Right column buttons */}
          <S.RightCol>
            <S.Button onClick={onReupload}>사진 재업로드 하기</S.Button>
            <S.Button onClick={onEdit}>수정하기</S.Button>
            <S.Primary onClick={onSubmit}>등록하기</S.Primary>
          </S.RightCol>
        </LayoutSm>
      </S.Padding>
    </ModalBase>
  );
}

export default AnalyzeModal;


