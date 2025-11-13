import styled from "styled-components";
import { vw } from "@/utils/units";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(96, 96, 96, 0.25);
  z-index: 1000;
`;

export const Card = styled.div`
  width: ${vw(760)};
  max-width: 90vw;
  background: linear-gradient(180deg, #FDFDFD 0%, #EAEDFF 100%);
  border-radius: 39.735px;
  box-shadow: 0 0 13.245px 0 rgba(180, 191, 255, 0.30);
  padding: ${vw(28)} ${vw(32)};
  display: flex;
  flex-direction: column;
  gap: ${vw(24)};
`;

export const TitlePill = styled.div`
  align-self: center;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${vw(12)} ${vw(96)};
  min-width: ${vw(560)};
  border-radius: ${vw(50)};
  border: ${vw(5)} solid #b4bfff;
  background: #f4f6ff;
  color: #7e8df5;
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans",
    "Helvetica Neue", Arial, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol", sans-serif;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%;
  letter-spacing: -0.6px;
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${vw(18)};
  min-height: ${vw(260)};
  justify-content: center;
`;

export const Illust = styled.img`
  display: block;
  width: ${vw(220)};
  height: ${vw(220)};
  object-fit: contain;
  user-select: none;
`;

export const Warning = styled.div`
  color: #6b6fb5;
  font-weight: 700;
  font-size: ${vw(18)};
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${vw(100)};
  margin-top: ${vw(6)};
`;

export const Button = styled.button`
  min-width: ${({ $small }) => ($small ? vw(120) : vw(160))};
  height: ${({ $small }) => ($small ? vw(48) : vw(56))};
  padding: 0 ${({ $small }) => ($small ? vw(16) : vw(20))};
  border-radius: ${vw(50)};
  border: ${vw(3)} solid #b4bfff;
  background: #eaedff;
  color: #7e8df5;
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans",
    "Helvetica Neue", Arial, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol", sans-serif;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%;
  letter-spacing: -0.6px;
  cursor: pointer;
`;


