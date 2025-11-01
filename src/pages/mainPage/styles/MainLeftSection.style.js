import styled from "styled-components";
import { vw } from "../../../utils/units";

export const LeftSectionContainer = styled.div`
  display: flex;
  width: ${vw(427)};
  padding: ${vw(60)} ${vw(36)} ${vw(33)} ${vw(36)};
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: ${vw(27)};
  background: linear-gradient(180deg, #fdfdfd 0%, #eaedff 100%);
`;

export const Logo = styled.img`
  width: ${vw(183)};
  height: ${vw(80)};
`;

export const DateBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

export const DateTop = styled.div`
  display: flex;
  text-align: center;
  gap: ${vw(10)};
  border-radius: ${vw(20)} ${vw(20)} 0 0;
  background: #fdfdfd;
  width: ${vw(118)};
  height: ${vw(40)};
  box-shadow: 0 0 20px 0 rgba(180, 191, 255, 0.3);
`;

export const DateTitle = styled.p`
  color: #4842b2;
  font-family: Pretendard;
  padding: ${vw(12)} ${vw(30)};
  font-size: ${vw(16)};
  font-style: normal;
  font-weight: 500;
  line-height: 100%; /* 16px */
  letter-spacing: -0.4px;
`;

export const DateBottom = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${vw(355)};
  height: ${vw(80)};
  border-radius: 0 ${vw(40)} ${vw(40)} ${vw(20)};
  background: #fdfdfd;
  box-shadow: 0 0 20px 0 rgba(180, 191, 255, 0.3);
  gap: ${vw(13)};
`;

export const YearText = styled.div`
  color: #7e8df5;
  font-family: Pretendard;
  font-size: ${vw(24)};
  font-style: normal;
  font-weight: 500;
  line-height: 100%; /* 24px */
  letter-spacing: -0.6px;
`;

export const TodayBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${vw(13)};
  width: ${vw(229)};
  height: ${vw(56)};
  flex-shrink: 0;
  border-radius: ${vw(30)};
  background: linear-gradient(
    90deg,
    rgba(234, 237, 255, 0.5) 0%,
    rgba(180, 191, 255, 0.5) 147.61%
  );
`;

export const TodayText = styled.p`
  color: #4842b2;
  font-family: Pretendard;
  font-size: ${vw(24)};
  font-style: normal;
  font-weight: 500;
  line-height: 100%; /* 24px */
  letter-spacing: -0.6px;
`;

export const Line = styled.img`
  width: ${vw(2)};
  height: ${vw(32)};
`;

export const TagBox = styled.img`
  width: ${vw(355)};
  height: ${vw(394)};
`;
