import styled from "styled-components";
import { vw } from "@/utils/units";

export const CenterSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 100;
  padding-top: ${vw(60)};
`;

export const CenterHeader = styled.div`
  display: flex;
  gap: ${vw(46)};
  margin-bottom: ${vw(-12)};
  margin-left: ${vw(223)};
`;
