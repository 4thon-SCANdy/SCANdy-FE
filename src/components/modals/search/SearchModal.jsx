import React from "react";
import ModalBase from "../ModalBase";
import * as S from "./SearchModal.style";
import ANDY from "@/assets/main/andy.svg";

function SearchModal({ open, onClose }) {
  return (
    <ModalBase open={open} onClose={onClose} title="" hideHeader closeOnOverlayClick centerBody noBodyPadding widthPx={960} heightPx={600}>
      <S.Empty>
        <S.EmptyImg src={ANDY} alt="empty" />
        <S.EmptyText>검색하신 일정이 없습니다!</S.EmptyText>
      </S.Empty>
    </ModalBase>
  );
}

export default SearchModal;


