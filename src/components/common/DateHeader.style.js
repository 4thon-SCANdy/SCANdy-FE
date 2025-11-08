import styled from "styled-components";
import { vw } from "@/utils/units";

export const Wrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${vw(10)};
`;

export const TopBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${vw(140)};
  height: ${vw(44)};
  border-radius: ${vw(18)};
  background: #fdfdfd;
  box-shadow: 0 0 ${vw(20)} rgba(180, 191, 255, 0.3);
  border: ${vw(2)} solid #c7cffd;
`;

export const BadgeText = styled.span`
  color: #4842b2;
  font-weight: 700;
  font-size: ${vw(18)};
`;

export const BottomBar = styled.div`
  display: flex;
  align-items: center;
  gap: ${vw(16)};
  padding: ${vw(16)};
  border-radius: 0 ${vw(40)} ${vw(40)} ${vw(20)};
  background: #fdfdfd;
  box-shadow: 0 0 ${vw(20)} rgba(180, 191, 255, 0.3);
`;

export const YearPill = styled.div`
  min-width: ${vw(180)};
  height: ${vw(70)};
  border-radius: ${vw(35)};
  background: #ffffff;
  border: ${vw(2)} solid #b4bfff;
  color: #7e8df5;
  font-weight: 800;
  font-size: ${vw(30)};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Capsule = styled.div`
  flex: 1;
  height: ${vw(70)};
  border-radius: ${vw(35)};
  background: #ffffff;
  border: ${vw(2)} solid #b4bfff;
  display: flex;
  align-items: center;
  padding: ${vw(6)} ${vw(8)};
`;

export const CapsuleInner = styled.div`
  width: 100%;
  height: 100%;
  border-radius: ${vw(30)};
  background: linear-gradient(90deg, rgba(234, 237, 255, 0.5) 0%, rgba(180, 191, 255, 0.5) 147.61%);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${vw(18)};
`;

export const CapsuleText = styled.span`
  color: #4842b2;
  font-weight: 700;
  font-size: ${vw(26)};
`;

export const Divider = styled.span`
  width: ${vw(2)};
  height: 60%;
  background: rgba(126, 141, 245, 0.5);
  border-radius: ${vw(1)};
`;


