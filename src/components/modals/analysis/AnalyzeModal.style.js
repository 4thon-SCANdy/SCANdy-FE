import styled, { css } from "styled-components";
import { vw } from "@/utils/units";

export const Padding = styled.div`
  padding: 2.6vw 2.2vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: linear-gradient(0deg, #FDFDFD 3.85%, #EAEDFF 100%);

box-shadow: 0 0 20px 0 rgba(180, 191, 255, 0.30);

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
  grid-template-columns: ${vw(420)} 1fr ${vw(420)}; /* left | preview | right */
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
  margin-top: ${vw(60)}
`;

export const CardBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${vw(0)};
`;

export const CardTop = styled.div`
  align-self: flex-start;
  border-radius: ${vw(24)} ${vw(24)} 0 0;
background: #FDFDFD;
  color: #4842b2;
  font-family: Pretendard;
  font-weight: 700;
  font-size: ${({ $fontSize }) => $fontSize || `${vw(18)}`};
  letter-spacing: -0.02em;
  padding: ${({ $padding }) => $padding || `${vw(12)} ${vw(28)}`};
`;

export const CardBottom = styled.div`
  width: 100%;
  border-radius: ${({ $radius }) => $radius || `0 ${vw(40)} ${vw(40)} ${vw(24)}`};
  background:rgb(255, 255, 255);
  padding: ${({ $padding }) => $padding || `${vw(24)} ${vw(28)}`};
  display: flex;
  flex-direction: column;
  gap: ${({ $gap }) => $gap || `${vw(16)}`};
`;

// Left column
export const OcrBox = styled(CardBottom)`
  padding: ${vw(20)} ${vw(22)};
  gap: ${vw(10)};
  max-width: ${vw(360)};
  width: 100%;
`;

export const OcrList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: ${vw(6)};
  li {
    color: #5d647f;
    line-height: 1.4;
    font-size: ${vw(15)};
  }
`;

export const OcrItem = styled.li`
  display: flex;
  align-items: center;
  gap: ${vw(8)};
  &:before {
    content: "";
    width: ${vw(6)};
    height: ${vw(6)};
    border-radius: 50%;
    background: #c7cffd;
    display: inline-block;
  }
`;

export const AiBox = styled(CardBottom)`
  gap: ${vw(6)};
  padding: ${vw(20)} ${vw(22)};
  max-width: ${vw(360)};
  width: 100%;
`;

export const FieldRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${vw(6)};
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
  height: ${vw(26)};
  color: #606060;
  background: #ffffff;
  display: inline-flex;
  align-items: center;
  padding: 0 ${vw(14)};
  font-weight: 600;
  font-size: ${vw(14)};

`;

export const CardsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${vw(6)};
`;

export const SuggestCard = styled(CardBox)`
  width: 100%;
  gap: ${vw(0)};
`;

export const BottomCardTop = styled(CardTop)`
  border-radius: 0 ${vw(50)} ${vw(50)} 0;
  background: linear-gradient(90deg, #b4bfff 0%, #eaedff 100%);
  box-shadow: 0 0 ${vw(20)} rgba(180, 191, 255, 0.3);
  min-width: ${vw(440)};
  max-width: 100%;
  padding: ${vw(12)} ${vw(36)} ${vw(12)} ${vw(28)};
`;

export const SuggestTitle = styled(CardTop)`
  font-size: ${vw(16)};
  min-width: ${vw(26)};
  max-width: 100%;
  padding: ${vw(10)} ${vw(20)};
  box-shadow: 0 0 ${vw(20)} rgba(180, 191, 255, 0.3);
`;

export const SuggestBody = styled(CardBottom)`
  border-radius: 0 ${vw(28)} ${vw(28)} ${vw(16)};
  padding: ${vw(18)} ${vw(25)};
  gap: ${vw(10)};
  width: 100%;
  max-width: ${vw(250)};
`;

export const BottomCardBody = styled(CardBottom)`
  background: transparent;
  box-shadow: none;
  padding: ${vw(16)} ${vw(8)};
  border-radius: 0;
`;

export const Meta = styled.div`
  display: grid;
  grid-template-columns: ${vw(70)} 1fr;
  row-gap: ${vw(6)};
  column-gap: ${vw(10)};
  align-items: center;
  color: #5d647f;
  font-size: ${vw(13)};
`;

export const MetaLabel = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: ${vw(28)};
  padding: 0 ${vw(12)};
  border-radius: ${vw(18)};
  border: ${vw(2)} solid rgba(126, 141, 245, 0.45);
  background: linear-gradient(180deg, #f4f6ff 0%, #eaedff 100%);
  color: #59608c;
  font-weight: 700;
  font-size: ${vw(13)};
`;

// Preview center
export const PreviewWrap = styled(CardBottom)`
  grid-column: 2 / 4; /* span center + right on top row to make image wider */
  grid-row: 1 / 2;
  position: relative; /* for absolute controls */
  border-radius: ${vw(28)};
  /* Align preview top with left OCR box top, and bottom near AI box end */
  margin-top: ${vw(60)};
  margin-bottom: ${vw(35)};
  padding: ${vw(18)}; /* reduce overall box height */
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
  background: transparent; /* match parent (box) background */
  position: relative;
  overflow: hidden;
  img { width: 100%; height: 100%; object-fit: contain; display: block; border-radius: inherit; }
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
  height: ${vw(64)};
  width: 100%;
  border-radius: ${vw(80)};
  border: ${vw(3)} solid #b4bfff;
  background: linear-gradient(180deg, #f4f6ff 0%, #eaedff 100%);
  color: #7e8df5;
  font-weight: 800;
  font-size: ${vw(20)};
  box-shadow: 0 0 ${vw(20)} rgba(180, 191, 255, 0.3);
`;

export const Primary = styled(Button)`
  margin-top: auto;
  border: ${vw(3)} solid #7e8df5;
  background: linear-gradient(90deg, #b4bfff 0%, #7e8df5 100%);
  color: #fff;
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


