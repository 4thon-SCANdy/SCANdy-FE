import React from "react";
import ModalBase from "../ModalBase";
import * as S from "./ConflictModal.style";

function ConflictModal({ open, onClose, conflicts = [] }) {
  return (
    <ModalBase open={open} onClose={onClose} title="일정 충돌 감지" widthPx={960} heightPx={560}>
      {conflicts.length === 0 ? (
        <S.Empty>충돌한 일정이 없어요.</S.Empty>
      ) : (
        <S.List>
          {conflicts.map((item) => (
            <S.Item key={item.id}>
              <S.Time>{item.time}</S.Time>
              <S.Title>{item.title}</S.Title>
            </S.Item>
          ))}
        </S.List>
      )}
    </ModalBase>
  );
}

export default ConflictModal;


