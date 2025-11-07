import styled from "styled-components";
import { vw } from "@/utils/units";

export const GoogleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CloseBtn = styled.img`
  width: ${vw(40)};
  height: ${vw(40)};
  flex-shrink: 0;
  aspect-ratio: 1/1;
  margin-left: ${vw(1050)};
  transform: translateX(${vw(50)});
  transform: translateY(${vw(-50)});
  cursor: pointer;
`;

export const GoogleContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${vw(132)};
`;

export const LoginTitle = styled.div`
  display: flex;
  width: ${vw(752)};
  padding: ${vw(15)} ${vw(30)};
  justify-content: center;
  align-items: center;
  gap: ${vw(10)};
  border-radius: ${vw(50)};
  border: 5px solid #b4bfff;
  background: #eaedff;
`;

export const TitleText = styled.p`
  color: #7e8df5;
  font-family: Pretendard;
  font-size: ${vw(48)};
  font-style: normal;
  font-weight: 500;
  line-height: 100%; /* 48px */
  letter-spacing: -1.2px;
`;

export const LoginContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${vw(16)};
`;

export const LoginSub = styled.div`
  display: flex;
  align-items: center;
  gap: ${vw(11)};
`;

export const SubIcon = styled.img`
  width: ${vw(42)};
  height: ${vw(42)};
`;

export const SubText = styled.p`
  color: #7e8df5;
  font-family: Pretendard;
  font-size: ${vw(24)};
  font-style: normal;
  font-weight: 500;
  line-height: 100%; /* 24px */
  letter-spacing: -0.6px;
`;

export const LoginBtn = styled.button`
  display: flex;
  width: ${vw(619)};
  height: ${vw(84)};
  padding: ${vw(15)} ${vw(147)};
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: ${vw(100)};
  background: #fff;
  margin-bottom: ${vw(40)};
`;

export const Google = styled.img`
  width: ${vw(50)};
  height: ${vw(51)};
`;

export const GoogleText = styled.p`
  color: #7e8df5;
  font-family: Pretendard;
  font-size: ${vw(35)};
  font-style: normal;
  font-weight: 500;
  line-height: 100%; /* 35px */
  letter-spacing: -0.875px;
`;
