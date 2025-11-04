import styled from "styled-components";
import { vw } from "@/utils/units";

export const TagContainer = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%); /* 가운데 정렬 */
  z-index: 10;

  display: flex;
  align-items: center;
  padding-left: ${vw(20)};

  background-color: ${({ $color }) => $color};

  ${({ $size }) =>
    $size === "large"
      ? `
          width: ${vw(320)};
          height: ${vw(40)};
          border-radius: ${vw(10)} 0 0 ${vw(10)}
        `
      : `
          width: ${vw(146)};
          height: ${vw(28)};
          border-radius: ${vw(5)} 0 0 ${vw(5)}
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
