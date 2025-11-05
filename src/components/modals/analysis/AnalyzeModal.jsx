import React from "react";
import ModalBase from "../ModalBase";
import * as S from "./AnalyzeModal.style";

function AnalyzeModal({ open, onClose, onReupload, onEdit, onSubmit }) {
  const ocrSamples = [
    "10월 24일 오후 2시 회의 있음",
    "10월 24일 오후 2시 회의 있음",
    "10월 24일 오후 2시 회의 있음",
    "10월 24일 오후 2시 회의 있음",
    "10월 24일 오후 2시 회의 있음",
  ];

  return (
    <ModalBase open={open} onClose={onClose} title="" hideHeader closeOnOverlayClick widthPx={1280} heightPx={980} noBodyPadding noScroll>
      <S.CloseFloating onClick={onClose} aria-label="close">×</S.CloseFloating>
      <S.Padding>
        <S.TopLabel>이미지 분석 결과</S.TopLabel>
        <S.Layout>
          {/* Left column (stacked sections) */}
          <S.LeftCol>
            <S.SectionTitle>OCR 추출 결과</S.SectionTitle>
            <S.OcrBox>
              <S.OcrList>
                {ocrSamples.map((t, i) => (
                  <S.OcrItem key={i}>{t}</S.OcrItem>
                ))}
              </S.OcrList>
            </S.OcrBox>

            <S.SectionTitle>AI 앤디가 인식한 일정</S.SectionTitle>
            <S.AiBox>
              <S.FieldRow>
                <S.Chip>제목</S.Chip>
                <S.Pill>일정을 입력해주세요</S.Pill>
              </S.FieldRow>
              <S.FieldRow>
                <S.Chip>날짜</S.Chip>
                <S.Pill>2025.10.26</S.Pill>
              </S.FieldRow>
              <S.FieldRow>
                <S.Chip>시간</S.Chip>
                <S.Pill>00:00</S.Pill>
              </S.FieldRow>
              <S.FieldRow>
                <S.Chip>장소</S.Chip>
                <S.Pill>회의실</S.Pill>
              </S.FieldRow>
            </S.AiBox>

          </S.LeftCol>

          {/* Preview center */}
          <S.PreviewWrap>
            <S.PreviewArea />
            <S.CarouselBar>
              <S.Dot $active />
              <S.Dot />
              <S.Dot />
              <S.Dot />
            </S.CarouselBar>
            <S.ArrowRow>
              <span>‹</span>
              <span>›</span>
            </S.ArrowRow>
          </S.PreviewWrap>

          {/* Bottom-left recommendations spanning left + center */}
          <S.BottomLeft>
            <S.RecommendHeader>AI앤디의 일정 대안 추천</S.RecommendHeader>
            <S.CardsRow>
              <S.SuggestCard>
                <S.SuggestTitle>이 시간을 추천해요!</S.SuggestTitle>
                <S.Meta>
                  <div>날짜</div><div>2025.10.26</div>
                  <div>시간</div><div>00:00</div>
                  <div>장소</div><div>회의실</div>
                </S.Meta>
              </S.SuggestCard>
              <S.SuggestCard>
                <S.SuggestTitle>이런 날짜는 어때요?</S.SuggestTitle>
                <S.Meta>
                  <div>날짜</div><div>2025.10.26</div>
                  <div>시간</div><div>00:00</div>
                  <div>장소</div><div>회의실</div>
                </S.Meta>
              </S.SuggestCard>
              <S.SuggestCard>
                <S.SuggestTitle>이 시간은 어떠신가요?</S.SuggestTitle>
                <S.Meta>
                  <div>날짜</div><div>2025.10.26</div>
                  <div>시간</div><div>00:00</div>
                  <div>장소</div><div>회의실</div>
                </S.Meta>
              </S.SuggestCard>
            </S.CardsRow>
          </S.BottomLeft>

          {/* Right column buttons */}
          <S.RightCol>
            <S.Button onClick={onReupload}>사진 재업로드 하기</S.Button>
            <S.Button onClick={onEdit}>수정하기</S.Button>
            <S.Primary onClick={onSubmit}>등록하기</S.Primary>
          </S.RightCol>
        </S.Layout>
      </S.Padding>
    </ModalBase>
  );
}

export default AnalyzeModal;


