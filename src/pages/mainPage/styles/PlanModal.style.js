import styled from "styled-components";
import { vw } from "@/utils/units";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 10000;
`;

export const PlanModalContainer = styled.div`
  width: ${vw(920)};
  height: ${vw(504)};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${vw(38)};
  flex-shrink: 0;
  border-radius: ${vw(60)};
  background: #fdfdfd;
  box-shadow: 0 0 ${vw(20)} 0 rgba(180, 191, 255, 0.3);
`;

export const ModalImg = styled.img`
  width: ${vw(240)};
  height: ${vw(184)};
  flex-shrink: 0;
`;

export const XText = styled.p`
  color: #7e8df5;
  text-align: center;
  font-family: Pretendard;
  font-size: ${vw(40)};
  font-style: normal;
  font-weight: 600;
  line-height: 100%; /* 40px */
  letter-spacing: -1px;
`;
