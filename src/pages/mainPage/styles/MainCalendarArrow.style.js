import styled from "styled-components";
import { vw } from "@/utils/units";

export const CalenderArrowContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${vw(80)};
`;

export const ArrowImg = styled.img`
  width: ${vw(35)};
  height: ${vw(46)};
  flex-shrink: 0;
  cursor: pointer;
`;
