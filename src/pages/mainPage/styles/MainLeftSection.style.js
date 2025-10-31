import styled from "styled-components";
import { vw } from "../../../utils/units";

export const LeftSectionContainer = styled.div`
  display: flex;
  width: ${vw(427)};
  padding: ${vw(60)} ${vw(36)} ${vw(33)} ${vw(36)};
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: ${vw(28)};
  background: linear-gradient(180deg, #fdfdfd 0%, #eaedff 100%);
`;

export const Logo = styled.img`
  width: ${vw(183)};
  height: ${vw(80)};
`;

export const TodayDate = styled.img`
  width: ${vw(355)};
`;

export const TagBox = styled.img`
  width: ${vw(355)};
  height: ${vw(394)};
`;
