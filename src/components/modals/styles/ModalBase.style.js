import styled, { css } from "styled-components";
import { vw } from "@/utils/units";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(96, 96, 96, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const Container = styled.div`
  width: ${({ $widthPx }) => vw($widthPx)};
  height: ${({ $heightPx }) => vw($heightPx)}; /* 고정 높이로 통일 */
  background: ${({ $background }) => $background || "#fff"};
  border-radius: ${vw(32)};
  box-shadow: ${({ $boxShadow }) =>
    $boxShadow || `0 ${vw(8)} ${vw(32)} rgba(0, 0, 0, 0.08)`};
  border: ${vw(2)} solid rgba(126, 141, 245, 0.6);
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const Header = styled.div`
  height: ${vw(80)};
  padding: 0 ${vw(28)};
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: ${vw(1)} solid rgba(126, 141, 245, 0.35);
  background: linear-gradient(180deg, #f7f8ff 0%, #ffffff 100%);
`;

export const Title = styled.h2`
  font-size: ${vw(24)};
  font-weight: 700;
  color: #7e8df5;
`;

export const CloseButton = styled.button`
  width: ${vw(40)};
  height: ${vw(40)};
  font-size: ${vw(28)};
  color: #7e8df5;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background 0.2s ease;
  &:hover { background: rgba(126, 141, 245, 0.12); }
`;

export const Body = styled.div`
  padding: ${({ $noPadding }) => ($noPadding ? 0 : css`${vw(43)} ${vw(28)}`)};
  flex: 1;
  overflow: ${({ $noScroll }) => ($noScroll ? 'hidden' : 'auto')};
  ${({ $center }) =>
    $center &&
    css`
      display: flex;
      align-items: center;
      justify-content: center;
    `}
`;

export const Footer = styled.div`
  padding: ${vw(20)} ${vw(28)};
  border-top: ${vw(1)} solid rgba(126, 141, 245, 0.2);
  display: flex;
  align-items: center;
  gap: ${vw(12)};
  justify-content: flex-end;
`;


