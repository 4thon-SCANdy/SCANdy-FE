import styled from "styled-components";
import { vw } from "@/utils/units";

export const Empty = styled.div`
  height: ${vw(240)};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #7e8df5;
  font-weight: 600;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${vw(12)};
`;

export const Item = styled.div`
  display: grid;
  grid-template-columns: ${vw(120)} 1fr;
  align-items: center;
  border: ${vw(1)} solid rgba(126, 141, 245, 0.35);
  border-radius: ${vw(12)};
  padding: ${vw(12)} ${vw(16)};
`;

export const Time = styled.span`
  color: #4842b2;
  font-weight: 700;
`;

export const Title = styled.span`
  color: #6a6a6a;
`;


