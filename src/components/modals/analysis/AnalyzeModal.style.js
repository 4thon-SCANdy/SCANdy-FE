import styled from "styled-components";
import { vw } from "@/utils/units";

export const Padding = styled.div`
  padding: 2.6vw 2.2vw;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const TopLabel = styled.div`
  width: ${vw(640)};
  height: ${vw(56)};
  margin: 0 auto ${vw(10)} auto;
  border-radius: ${vw(32)};
  border: ${vw(2)} solid rgba(126, 141, 245, 0.6);
  background: linear-gradient(180deg, #f7f8ff 0%, #ffffff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #7e8df5;
  font-weight: 800;
  font-size: ${vw(20)};
`;

export const Layout = styled.div`
  display: grid;
  grid-template-columns: ${vw(420)} 1fr ${vw(260)}; /* left | preview | right */
  grid-template-rows: 1fr auto; /* top (preview + info) | bottom (recommend + buttons) */
  column-gap: ${vw(24)};
  row-gap: ${vw(24)};
  flex: 1;
  min-height: 0; /* allow children to size within grid */
`;

export const LeftCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${vw(16)};
  min-height: 0;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
`;

// Common box
export const Box = styled.div`
  border-radius: ${vw(16)};
  border: ${vw(2)} solid rgba(126, 141, 245, 0.45);
  background: linear-gradient(180deg, #fafbff 0%, #ffffff 100%);
  padding: ${vw(16)};
`;

export const SectionTitle = styled.div`
  color: #7e8df5;
  font-weight: 800;
  font-size: ${vw(18)};
  letter-spacing: -0.015em;
  margin: ${vw(8)} 0 ${vw(12)} 0; /* push titles slightly down and add a bit more bottom gap */
`;

// Left column
export const OcrBox = styled(Box)``;

export const OcrList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: ${vw(8)};
  li { color: #5d647f; line-height: 1.5; }
`;

export const OcrItem = styled.li`
  display: flex;
  align-items: center;
  gap: ${vw(10)};
  &:before {
    content: "";
    width: ${vw(8)};
    height: ${vw(8)};
    border-radius: 50%;
    background: #c7cffd;
    display: inline-block;
  }
`;

export const AiBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: ${vw(10)};
`;

export const FieldRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${vw(10)};
`;

export const Chip = styled.div`
  min-width: ${vw(56)};
  height: ${vw(28)};
  border-radius: ${vw(16)};
  border: ${vw(2)} solid #c7cffd;
  background: #eef2ff;
  color: #7e8df5;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 ${vw(12)};
  font-weight: 800;
  font-size: ${vw(14)};
`;

export const Pill = styled.div`
  height: ${vw(36)};
  border-radius: ${vw(18)};
  border: ${vw(2)} solid #d6dbff;
  background: #ffffff;
  color: #7e8df5;
  display: inline-flex;
  align-items: center;
  padding: 0 ${vw(14)};
  font-weight: 800;
  box-shadow: 0 ${vw(2)} ${vw(10)} rgba(126, 141, 245, 0.12);
`;

export const RecommendHeader = styled.div`
  height: ${vw(44)};
  border-radius: ${vw(24)};
  border: ${vw(2)} solid rgba(126, 141, 245, 0.45);
  background: linear-gradient(180deg, #f7f8ff 0%, #ffffff 100%);
  display: flex;
  align-items: center;
  padding: 0 ${vw(16)};
  color: #7e8df5;
  font-weight: 800;
`;

export const CardsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${vw(10)};
`;

export const SuggestCard = styled(Box)`
  padding: ${vw(10)} ${vw(12)};
`;

export const SuggestTitle = styled.div`
  color: #7e8df5;
  font-weight: 800;
  margin-bottom: ${vw(6)};
  font-size: ${vw(16)};
`;

export const Meta = styled.div`
  display: grid;
  grid-template-columns: ${vw(52)} 1fr;
  row-gap: ${vw(6)};
  column-gap: ${vw(8)};
  color: #5d647f;
  font-size: ${vw(14)};
`;

// Preview center
export const PreviewWrap = styled(Box)`
  grid-column: 2 / 4; /* span center + right on top row to make image wider */
  grid-row: 1 / 2;
  position: relative; /* for absolute controls */
  border: ${vw(1)} solid rgba(126, 141, 245, 0.45);
  /* Align preview top with left OCR box top, and bottom near AI box end */
  margin-top: ${vw(60)};
  margin-bottom: ${vw(35)};
  padding: ${vw(12)}; /* reduce overall box height */
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
  min-height: 0;
`;

export const PreviewArea = styled.div`
  flex: 0 0 ${vw(385)};
  height: ${vw(385)};
  border-radius: ${vw(12)};
  background: #ddd;
  position: relative;
  overflow: hidden;
  &:after, &:before {
    content: "";
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: linear-gradient( to bottom right, transparent 49%, #000 50%, transparent 51% );
    opacity: 0.2;
    pointer-events: none;
  }
  &:before {
    transform: scaleX(-1);
  }
`;

export const CarouselBar = styled.div`
  position: absolute;
  left: 50%;
  bottom: ${vw(54)}; /* dots a bit above arrows */
  transform: translateX(-50%);
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${vw(12)};
`;

export const Dot = styled.span`
  width: ${vw(12)};
  height: ${vw(12)};
  border-radius: 50%;
  border: ${vw(2)} solid #c7cffd;
  background: ${({ $active }) => ($active ? '#7e8df5' : '#eef2ff')};
  cursor: pointer;
`;

export const ArrowRow = styled.div`
  position: absolute;
  left: 50%;
  bottom: ${vw(12)}; /* arrows below dots */
  transform: translateX(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${vw(28)};
  padding: ${vw(6)} ${vw(10)};
  border-radius: ${vw(16)};
  background: rgba(255,255,255,0.7);
  color: #7e8df5;
  font-weight: 800;
`;

// Right controls
export const RightCol = styled.div`
  grid-column: 3 / 4;
  grid-row: 2 / 3;
  display: flex;
  flex-direction: column;
  gap: ${vw(16)};
  align-items: stretch;
  justify-content: flex-end;
`;

export const BottomLeft = styled.div`
  grid-column: 1 / 3;
  grid-row: 2 / 3;
  display: flex;
  flex-direction: column;
  gap: ${vw(12)};
`;

export const Button = styled.button`
  height: ${vw(56)};
  border-radius: ${vw(32)};
  border: ${vw(2)} solid #7e8df5;
  background: #ffffff;
  color: #7e8df5;
  font-weight: 800;
  font-size: ${vw(18)};
`;

export const Primary = styled(Button)`
  margin-top: auto;
  background: linear-gradient(90deg, #7e8df5 0%, #6aa6ff 100%);
  color: #fff;
  border: none;
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


