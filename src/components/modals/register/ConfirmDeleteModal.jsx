import React from "react";
import REVERT from "@/assets/modal/revert.svg";
import * as S from "./ConfirmDeleteModal.style";

function ConfirmDeleteModal({ open, onCancel, onConfirm, imageUrl }) {
  if (!open) return null;
  const src = imageUrl || REVERT;
  return (
    <S.Overlay role="dialog" aria-modal="true" aria-label="일정 삭제 확인">
      <S.Card>
        <S.TitlePill>일정 삭제</S.TitlePill>
        <S.Body>
          <S.Illust src={src} alt="revert" />
          <S.Warning>※ 삭제하시면 되돌릴 수 없습니다.</S.Warning>
        </S.Body>
        <S.Actions>
          <S.Button $small onClick={onCancel}>취소</S.Button>
          <S.Button $small onClick={onConfirm}>삭제</S.Button>
        </S.Actions>
      </S.Card>
    </S.Overlay>
  );
}

export default ConfirmDeleteModal;


