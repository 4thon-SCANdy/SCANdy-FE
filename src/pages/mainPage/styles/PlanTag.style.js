import styled from "styled-components";
import { vw } from "@/utils/units";

export const TagWrapper = styled.div`
  background: ${({ $size }) =>
    $size === "large"
      ? "linear-gradient(180deg, #FDFDFD 0%, #EAEDFF 215.1%)"
      : "#fdfdfd"};

  padding-top: ${({ $size }) => ($size === "large" ? "0" : vw(6))};
  padding-left: ${({ $size }) => ($size === "large" ? "0" : vw(6))};
`;

export const TagContainer = styled.div`
  left: 50%;
  z-index: 10000;

  display: flex;
  align-items: center;
  padding-left: ${vw(20)};

  background-color: ${({ $color }) => $color};

  ${({ $size }) =>
    $size === "large"
      ? `
          width: ${vw(320)};
          height: ${vw(40)};
          border-radius: ${vw(10)} 0 0 ${vw(10)};
        `
      : `
          width: ${vw(146)};
          height: ${vw(28)};
          border-radius: ${vw(5)} 0 0 ${vw(5)};
        `};
`;

export const TagText = styled.p`
  ${({ $size }) =>
    $size === "large"
      ? `
          font-size: ${vw(18)};
        `
      : `
          font-size: ${vw(16)};
        `}
  color: #fff;
  font-family: Pretendard;
  font-weight: 500;
  line-height: 100%;
  letter-spacing: -0.4px;
`;
