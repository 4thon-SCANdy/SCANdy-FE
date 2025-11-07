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

export const ButtonWrapper = styled.div`
  display: flex;
  gap: ${vw(140)};
`;

export const GoogleBtn = styled.button`
  display: flex;
  width: 414px;
  padding: 15px 30px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 50px;
  border: 3px solid #b4bfff;
  background: #f4f6ff;
`;

export const ContiBtn = styled.button`
  display: flex;
  width: 414px;
  padding: 15px 30px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 50px;
  border: 3px solid #b4bfff;
  background: #eaedff;
`;

export const BtnText = styled.p`
  color: #7e8df5;
  font-family: Pretendard;
  font-size: 28px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%; /* 28px */
  letter-spacing: -0.7px;
`;
