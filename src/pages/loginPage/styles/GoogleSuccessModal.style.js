import styled from "styled-components";
import { vw } from "@/utils/units";

export const SuccessContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const CloseBtn = styled.img`
  position: absolute;
  width: ${vw(40)};
  height: ${vw(40)};
  margin-left: ${vw(880)};
  transform: translateX(${vw(50)});
  transform: translateY(${vw(-70)});
  cursor: pointer;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${vw(66)};
  margin-top: ${vw(40)};
`;

export const SuccessBox = styled.div`
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

export const SuccessText = styled.p`
  color: #7e8df5;
  font-family: Pretendard;
  font-size: ${vw(28)};
  font-style: normal;
  font-weight: 500;
  line-height: 100%; /* 28px */
  letter-spacing: -0.7px;
`;

export const CheckBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${vw(79)};
`;

export const MailBox = styled.div`
  display: flex;
  width: ${vw(752)};
  height: ${vw(78)};
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 100px;
  background: #fff;
  border: ${({ $isSuccess }) => ($isSuccess ? "none" : "2px solid #606060")};
  background: ${({ $isSuccess }) =>
    $isSuccess ? "#fff" : "rgba(229, 229, 229, 0.5)"};
`;

export const MailText = styled.p`
  color: ${({ $isSuccess }) => ($isSuccess ? "#7e8df5" : "#606060")};
  font-family: Pretendard;
  font-size: ${vw(28)};
  font-style: normal;
  font-weight: 500;
  line-height: 100%; /* 28px */
  letter-spacing: -0.7px;
`;

export const OkBox = styled.button`
  display: inline-flex;
  width: ${vw(108)};
  height: ${vw(58)};
  padding: ${vw(30)} ${vw(15)};
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: ${vw(50)};
  border: 3px solid #b4bfff;
  background: #eaedff;
`;

export const OkText = styled.p`
  color: #7e8df5;
  font-family: Pretendard;
  font-size: ${vw(28)};
  font-style: normal;
  font-weight: 500;
  line-height: 100%; /* 28px */
  letter-spacing: -0.7px;
`;
