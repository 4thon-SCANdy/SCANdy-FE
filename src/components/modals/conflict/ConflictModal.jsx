import React from "react";
import ModalBase from "../ModalBase";
import * as S from "./ConflictModal.style";
import ANDY from "@/assets/main/andy.svg";

function ConflictModal({ open, onClose, conflicts = [] }) {
  return (
    <ModalBase open={open} onClose={onClose} title="" hideHeader closeOnOverlayClick widthPx={960} heightPx={600} noBodyPadding>
      <S.CloseFloating onClick={onClose} aria-label="close">×</S.CloseFloating>
      <S.Padding>
        <S.Content>
          <S.TopLabel>일정 충돌!</S.TopLabel>

          <S.Center>
            <S.Icon src={ANDY} alt="conflict" />
            {conflicts.length > 0 ? (
              <S.MessageWrap>
                <S.MainText>
                  {conflicts[0].time}에 이미 '{conflicts[0].title}'가 (이) 있습니다.
                </S.MainText>
                <S.SubText>일정이 겹치니 확인 해주세요!</S.SubText>
              </S.MessageWrap>
            ) : (
              <S.Empty>충돌한 일정이 없어요.</S.Empty>
            )}
          </S.Center>

          <S.ButtonRow>
            <S.LargeButton $muted>무시하고 등록하기</S.LargeButton>
            <S.LargeButton>일정 수정하기</S.LargeButton>
          </S.ButtonRow>
        </S.Content>
      </S.Padding>
    </ModalBase>
  );
}

export default ConflictModal;


