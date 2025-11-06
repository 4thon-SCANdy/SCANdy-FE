import styled from "styled-components";
import { vw } from "@/utils/units";

export const LoginModalContainer = styled.div`
  width: ${vw(1208)};
  height: ${vw(662)};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: ${vw(60)};
  background: linear-gradient(180deg, #fdfdfd 0%, #eaedff 100%);
  box-shadow: 0 0 20px 0 rgba(180, 191, 255, 0.3);
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(96, 96, 96, 0.15);
`;
