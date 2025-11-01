import styled from "styled-components";
import { vw } from "@/utils/units";

export const RightSectionContainer = styled.div``;

export const GoogleBox = styled.div`
  display: flex;
  width: ${vw(253)};
  height: ${vw(54)};
  padding: ${vw(8)} ${vw(13)} ${vw(8)} ${vw(20)};
  justify-content: flex-start;
  gap: ${vw(50)};
  align-items: center;
  flex-shrink: 0;
  border-radius: ${vw(50)};
  border: ${vw(1)} solid #e5e5e5;
  background: #fdfdfd;
  box-shadow: ${vw(4)} ${vw(4)} ${vw(10)} 0 rgba(229, 229, 229, 0.2);
`;

export const GoogleImg = styled.img`
  width: ${vw(38)};
  height: ${vw(38)};
`;

export const GoogleText = styled.p`
  color: #606060;
  font-family: Pretendard;
  font-size: ${vw(20)};
  font-style: normal;
  font-weight: 500;
  line-height: 100%; /* 20px */
  letter-spacing: -0.5px;
`;
