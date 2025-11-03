import styled from "styled-components";
import { vw } from "@/utils/units";

export const CalenderArrowContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${({ $gap }) => ($gap ? vw($gap) : vw(80))};
`;

export const ArrowImg = styled.img`
  width: ${({ $width }) => ($width ? vw($width) : vw(35))};
  height: ${({ $height }) => ($height ? vw($height) : vw(46))};
  flex-shrink: 0;
  cursor: pointer;
`;
