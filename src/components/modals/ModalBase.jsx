import React from "react";
import * as S from "./styles/ModalBase.style";

function ModalBase({ open, title, onClose, widthPx = 1040, heightPx = 640, children, footer }) {
  if (!open) return null;

  return (
    <S.Overlay role="dialog" aria-modal>
      <S.Container $widthPx={widthPx} $heightPx={heightPx}>
        <S.Header>
          <S.Title>{title}</S.Title>
          <S.CloseButton onClick={onClose} aria-label="close">×</S.CloseButton>
        </S.Header>
        <S.Body>{children}</S.Body>
        {footer ? <S.Footer>{footer}</S.Footer> : null}
      </S.Container>
    </S.Overlay>
  );
}

export default ModalBase;


