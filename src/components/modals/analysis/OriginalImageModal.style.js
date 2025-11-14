import styled from "styled-components";
import { vw } from "@/utils/units";
import * as A from "./AnalyzeModal.style";

export const Padding = A.Padding;
export const TopLabel = A.TopLabel;
export const Layout = A.Layout;
export const LeftCol = A.LeftCol;
export const CardBox = A.CardBox;
export const CardTop = A.CardTop;
export const OcrBox = A.OcrBox;
export const OcrList = A.OcrList;
export const OcrItem = A.OcrItem;
export const AiBox = A.AiBox;
export const FieldRow = A.FieldRow;
export const Chip = A.Chip;
export const Pill = A.Pill;
export const PreviewWrap = A.PreviewWrap;
export const PreviewArea = A.PreviewArea;
export const CarouselBar = A.CarouselBar;
export const Dot = A.Dot;
export const ArrowRow = A.ArrowRow;
export const CloseFloating = A.CloseFloating;

// 하단 중앙 단일 확인 버튼 영역
export const BottomCenter = styled(A.BottomLeft)`
  grid-column: 1 / 4;
  align-items: center;
`;

export const Confirm = styled(A.Button)`
  width: ${vw(240)};
  margin: 0 auto;
  border: ${vw(3)} solid #B4BFFF;
  background: #F4F6FF;
`;


