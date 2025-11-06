import styled from "styled-components";
import { vw } from "@/utils/units";

export const LoginContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${vw(228)};
  width: ${vw(1920)};
  height: ${vw(1080)};
  background: linear-gradient(180deg, #fff 0%, #eaedff 100%);
  padding: 0 ${vw(196)} 0 ${vw(167)};
`;

export const ScrollCalendar = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;
  gap: ${vw(65)};

  overflow: hidden;
  overflow-y: auto;
  scroll-behavior: auto;

  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  padding-top: calc(50vh - ${vw(300)});
  padding-bottom: calc(50vh - ${vw(300)});
`;

export const LoginRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${vw(80)};
  margin-top: ${vw(89)};
`;

export const Logo = styled.img`
  width: ${vw(366)};
  height: ${vw(160)};
`;

export const LoginBtn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${vw(30)};
`;

export const GoogleBtn = styled.button`
  display: flex;
  width: ${vw(619)};
  height: ${vw(81)};
  padding: ${vw(15)} ${vw(147)};
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  border-radius: ${vw(100)};
  background: #fff;

  p {
    color: #7e8df5;
    font-family: Pretendard;
    font-size: ${vw(35)};
    font-weight: 500;
    line-height: 100%; /* 35px */
    letter-spacing: -0.875px;
  }
`;

export const GoogleImg = styled.img`
  width: ${vw(50)};
  height: ${vw(51)};
`;

export const BasicBtn = styled.button`
  display: flex;
  width: ${vw(541)};
  height: ${vw(58)};
  padding: ${vw(15)} ${vw(30)};
  justify-content: center;
  align-items: center;
  border-radius: ${vw(50)};
  border: ${vw(2)} solid #b4bfff;
  background: #f4f6ff;

  p {
    color: #7e8df5;
    font-family: Pretendard;
    font-size: ${vw(28)};
    font-weight: 500;
    line-height: 100%; /* 28px */
    letter-spacing: -0.7px;
  }
`;
