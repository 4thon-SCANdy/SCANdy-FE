import styled from "styled-components";
import { vw } from "@/utils/units";

export const ColorChipContainer = styled.div`
  width: ${vw(86)};
  height: ${vw(158)};
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(5, 1fr);
  justify-items: center;
  align-items: center;
  gap: ${vw(6)};
  border-radius: 0 ${vw(10)} ${vw(10)} 0;
  background: #fff;
  z-index: 10000;
`;

export const Color = styled.div`
  position: relative;
  width: ${vw(22)};
  height: ${vw(22)};
  flex-shrink: 0;
  border-radius: ${vw(11)};
  background-color: ${({ $color }) => $color};
  cursor: pointer;

  &::after {
    content: "";
    display: ${({ $isSelected }) => ($isSelected ? "block" : "none")};
    position: absolute;
    top: 50%;
    left: 50%;
    width: ${vw(15)};
    height: ${vw(15)};
    border: 1px solid white;
    border-radius: ${vw(11)};
    transform: translate(-50%, -50%);
  }
`;
