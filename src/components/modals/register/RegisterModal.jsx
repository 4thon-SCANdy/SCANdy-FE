import React from "react";
import ModalBase from "../ModalBase";
import * as S from "./RegisterModal.style";

function RegisterModal({ open, onClose, onOpenAI, onOpenManual }) {
  return (
    <ModalBase open={open} onClose={onClose} title="일정 등록하기" widthPx={1120} heightPx={700}>
      <S.SearchInput placeholder="일정을 검색해 주세요" />
      <S.CardRow>
        <S.Card>
          <S.CardTitle>이미지 등록하기 (AI 인식)</S.CardTitle>
          <S.CardAction onClick={onOpenAI}>이미지로 등록</S.CardAction>
        </S.Card>
        <S.Card>
          <S.CardTitle>직접 일정 등록하기</S.CardTitle>
          <S.CardAction onClick={onOpenManual}>직접 입력</S.CardAction>
        </S.Card>
      </S.CardRow>
    </ModalBase>
  );
}

export default RegisterModal;


