import styled from "styled-components";
import { vw } from "@/utils/units";

export const BasicContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${vw(74)};
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${vw(30)};
  margin-top: ${vw(40)};
`;

export const Icon = styled.img`
  width: ${vw(240)};
  height: ${vw(184)};
`;

export const HeaderTextWrapper = styled.div`
  display: flex;
`;

export const HeaderText = styled.p`
  color: #7e8df5;
  text-align: center;
  font-family: Pretendard;
  font-size: ${vw(28)};
  font-style: normal;
  font-weight: 400;
  line-height: 100%; /* 28px */
  letter-spacing: -0.7px;

  span {
    font-size: ${vw(60)};
    font-weight: 300;
  }
`;

export const HeaderIcon = styled.img`
  width: ${vw(24)};
  height: ${vw(24)};
  flex-shrink: 0;
  transform: translateX(450%);
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: ${vw(140)};
`;

export const GoogleBtn = styled.button`
  display: flex;
  width: ${vw(414)};
  padding: ${vw(15)} ${vw(30)};
  justify-content: center;
  align-items: center;
  gap: ${vw(10)};
  border-radius: 50px;
  border: 3px solid #b4bfff;
  background: #f4f6ff;
`;

export const ContiBtn = styled.button`
  display: flex;
  width: ${vw(414)};
  padding: ${vw(15)} ${vw(30)};
  justify-content: center;
  align-items: center;
  gap: ${vw(10)};
  border-radius: ${vw(50)};
  border: 3px solid #b4bfff;
  background: #eaedff;
`;

export const BtnText = styled.p`
  color: #7e8df5;
  font-family: Pretendard;
  font-size: ${vw(28)};
  font-style: normal;
  font-weight: 500;
  line-height: 100%; /* 28px */
  letter-spacing: -0.7px;
`;
