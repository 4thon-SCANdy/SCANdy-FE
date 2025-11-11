import React from "react";
import * as S from "./styles/ModalBase.style";

function ModalBase({
  open,
  title,
  onClose,
  widthPx = 1040,
  heightPx = 640,
  children,
  footer,
  hideHeader = false,
  closeOnOverlayClick = false,
  centerBody = false,
  noBodyPadding = false,
  noScroll = false,
  containerBg,
  containerShadow,
}) {
  if (!open) return null;

  return (
    <S.Overlay
      role="dialog"
      aria-modal
      onClick={closeOnOverlayClick ? onClose : undefined}
    >
      <S.Container
        $widthPx={widthPx}
        $heightPx={heightPx}
        $background={containerBg}
        $boxShadow={containerShadow}
        onClick={(e) => e.stopPropagation()}
      >
        {hideHeader ? null : (
          <S.Header>
            <S.Title>{title}</S.Title>
            <S.CloseButton onClick={onClose} aria-label="close">×</S.CloseButton>
          </S.Header>
        )}
        <S.Body $center={centerBody} $noPadding={noBodyPadding} $noScroll={noScroll}>{children}</S.Body>
        {footer ? <S.Footer>{footer}</S.Footer> : null}
      </S.Container>
    </S.Overlay>
  );
}

export default ModalBase;


