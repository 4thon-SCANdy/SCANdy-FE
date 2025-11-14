import styled from "styled-components";
import { vw } from "@/utils/units";

export const Wrapper = styled.div`
  min-height: 100vh;
  padding: ${vw(40)};
  background: #f7f8ff;
`;

export const Title = styled.h1`
  font-size: ${vw(28)};
  color: #4842b2;
  margin-bottom: ${vw(24)};
`;

export const ButtonRow = styled.div`
  display: flex;
  gap: ${vw(12)};
`;

export const Button = styled.button`
  height: ${vw(44)};
  padding: 0 ${vw(16)};
  border-radius: ${vw(22)};
  background: #7e8df5;
  color: #fff;
  font-weight: 600;
`;


