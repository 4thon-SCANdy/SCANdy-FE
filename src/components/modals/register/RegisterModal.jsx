import React from "react";
import ModalBase from "../ModalBase";
import * as S from "./RegisterModal.style";
import IMAGE_PREVIEW from "@/assets/modal/Image.svg";
import DIRECT_PREVIEW from "@/assets/modal/Direct.svg";

function RegisterModal({ open, onClose, onOpenAI, onOpenManual }) {
  return (
    <ModalBase open={open} onClose={onClose} title="" hideHeader closeOnOverlayClick widthPx={960} heightPx={600} noBodyPadding>
      <S.CloseFloating onClick={onClose} aria-label="close">×</S.CloseFloating>
      <S.Padding>
        <S.Content>
        <S.TopLabel>
          일정 등록하기
        </S.TopLabel>

        <S.CardRow>
          <S.Card>
            <S.Preview src={IMAGE_PREVIEW} alt="이미지 등록 미리보기" />
          </S.Card>
          <S.Card>
            <S.Preview src={DIRECT_PREVIEW} alt="직접 등록 미리보기" />
          </S.Card>
        </S.CardRow>

        <S.BottomRow>
          <S.LargeButton onClick={onOpenAI}>이미지 등록하기 (AI 인식)</S.LargeButton>
          <S.LargeButton onClick={onOpenManual}>직접 등록하기</S.LargeButton>
        </S.BottomRow>
        </S.Content>
      </S.Padding>
    </ModalBase>
  );
}

export default RegisterModal;
