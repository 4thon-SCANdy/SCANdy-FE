import styled from "styled-components";
import { vw } from "@/utils/units";

export const Empty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  gap: ${vw(16)};
`;

export const EmptyImg = styled.img`
  width: ${vw(160)};
  height: auto;
`;

export const EmptyText = styled.div`
  color: #7e8df5;
  font-weight: 800;
  font-size: ${vw(28)};
`;


