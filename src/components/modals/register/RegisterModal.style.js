import styled from "styled-components";
import { vw } from "@/utils/units";

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${vw(43)}; /* 섹션 간 세로 간격 */
`;

export const TopLabel = styled.div`
  width: ${vw(640)};
  height: ${vw(56)};
  margin: 0 auto;
  border-radius: ${vw(32)};
  border: ${vw(2)} solid rgba(126, 141, 245, 0.6);
  background: linear-gradient(180deg, #f7f8ff 0%, #ffffff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  color: #7e8df5;
  font-weight: 800;
  font-size: ${vw(20)};
`;

export const TopX = styled.button`
  position: absolute;
  top: 50%;
  right: ${vw(18)};
  transform: translateY(-50%);
  width: ${vw(32)};
  height: ${vw(32)};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: ${vw(20)};
  color: #7e8df5;
  background: transparent;
  border: none;
  cursor: pointer;
`;

export const CardRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${vw(24)};
`;

export const Card = styled.div`
  aspect-ratio: 16 / 9;
  border-radius: ${vw(24)};
  border: ${vw(2)} solid rgba(126, 141, 245, 0.45);
  background: transparent;
  overflow: hidden;
`;

export const Preview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  /* SVG 내부의 외곽 프레임/글로우를 잘라내기 위한 클리핑 */
  clip-path: inset(${vw(12)} ${vw(12)} ${vw(12)} ${vw(12)} round ${vw(16)});
`;

export const BottomRow = styled.div`
  margin-top: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${vw(36)};
`;

export const LargeButton = styled.button`
  height: ${vw(56)}; 
  border-radius: ${vw(32)}; 
  border: ${vw(2)} solid #7e8df5;
  background: #ffffff;
  color: #7e8df5;
  font-weight: 800;
  font-size: ${vw(20)}; 
  align-items: center;
  justify-content: center;
`;

export const CloseFloating = styled.button`
  position: absolute;
  top: ${vw(14)};
  right: ${vw(18)};
  width: ${vw(56)};
  height: ${vw(56)};
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: ${vw(34)};
  color: #7e8df5;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 5;
  &:hover { background: rgba(126, 141, 245, 0.1); }
`;


