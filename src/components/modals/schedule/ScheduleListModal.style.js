import styled from "styled-components";
import { vw } from "@/utils/units";

export const Padding = styled.div`
  padding: 2.6vw 2.2vw;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const DateRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${vw(20)};
  width: 100%;
  margin-bottom: ${vw(12)};
`;

export const DateBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: ${vw(0)};
`;

export const DateTop = styled.div`
  display: flex;
  text-align: center;
  gap: ${vw(10)};
  border-radius: ${vw(20)} ${vw(20)} 0 0;
  background: #fdfdfd;
  width: ${({ $width }) => $width || vw(118)};
  height: ${vw(40)};
  box-shadow: 0 0 20px 0 rgba(180, 191, 255, 0.3);
`;

export const DateTitle = styled.p`
  color: #4842b2;
  font-family: Pretendard;
  padding: ${vw(12)} ${vw(30)};
  font-size: ${vw(16)};
  font-style: normal;
  font-weight: 500;
  line-height: 100%;
  letter-spacing: -0.4px;
`;

export const DateBottom = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${vw(355)};
  height: ${vw(80)};
  border-radius: 0 ${vw(40)} ${vw(40)} ${vw(20)};
  background: #fdfdfd;
  box-shadow: 0 0 20px 0 rgba(180, 191, 255, 0.3);
`;

export const YearText = styled.div`
  color: #7e8df5;
  font-family: Pretendard;
  font-size: ${vw(24)};
  font-style: normal;
  font-weight: 500;
  line-height: 100%;
  letter-spacing: -0.1px;
`;

export const TodayBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${vw(13)};
  width: ${vw(229)};
  height: ${vw(56)};
  flex-shrink: 0;
  border-radius: ${vw(30)};
  background: linear-gradient(
    90deg,
    rgba(234, 237, 255, 0.5) 0%,
    rgba(180, 191, 255, 0.5) 147.61%
  );
`;

export const TodayText = styled.p`
  color: #4842b2;
  font-family: Pretendard;
  font-size: ${vw(24)};
  font-style: normal;
  font-weight: 500;
  line-height: 100%;
  letter-spacing: -0.6px;
`;

export const Line = styled.img`
  width: ${vw(2)};
  height: ${vw(32)};
`;

// 상단 탭을 하나의 분할 컨트롤처럼 보이도록
export const Segmented = styled.div`
  flex: 1;
  height: ${vw(56)};
  border-radius: ${vw(32)};
  border: ${vw(2)} solid rgba(126, 141, 245, 0.65);
  background: transparent;
  display: flex;
  overflow: hidden;
  padding: ${vw(4)};
  gap: ${vw(4)};
`;

export const SegBtn = styled.button`
  flex: 1;
  height: 100%;
  border: ${vw(5)} solid #B4BFFF; /* default (unselected) */
  border-radius: ${vw(28)};
  background: #F4F6FF;            /* default (unselected) */
  color: #7480f2;
  font-weight: 800;
  font-size: ${vw(18)};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${vw(8)};
  box-shadow: none;
  transition: all 0.2s ease;
  cursor: pointer;
  img {
    transition: filter 0.2s ease;
  }

  &:focus-visible {
    outline: ${vw(2)} solid rgba(126, 141, 245, 0.7);
    outline-offset: ${vw(2)};
  }

  &:first-child {
    border-top-left-radius: ${vw(32)};
    border-bottom-left-radius: ${vw(32)};
  }

  &:last-child {
    border-top-right-radius: ${vw(32)};
    border-bottom-right-radius: ${vw(32)};
  }

  &.active {
    background: transparent;
    border-color: transparent;
    color: #4f5bf5;
    box-shadow: none;
    img {
      filter: brightness(1.1);
    }
  }
`;

export const ListWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${vw(14)};
  overflow: auto;
  padding-right: ${vw(6)};
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: ${({ $shareMode }) =>
    $shareMode
      ? `${vw(120)} ${vw(130)} 1fr ${vw(68)}`
      : `${vw(120)} ${vw(130)} 1fr ${vw(220)}`};
  gap: ${vw(14)};
  align-items: center;
  border-radius: ${vw(20)};
  border: ${vw(2)} solid rgba(126, 141, 245, 0.35);
  background: linear-gradient(180deg, #fafbff 0%, #ffffff 100%);
  padding: ${vw(14)};
`;

export const TimeDisplayCol = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ShareCol = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ShareSelect = styled.button`
  width: ${vw(32)};
  height: ${vw(32)};
  border-radius: 50%;
  border: ${vw(2)} solid rgba(126, 141, 245, 0.4);
  background: ${({ $selected }) => ($selected ? "#7e8df5" : "transparent")};
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease;
  &:hover {
    border-color: #7e8df5;
  }
  &:focus-visible {
    outline: ${vw(2)} solid rgba(126, 141, 245, 0.5);
    outline-offset: ${vw(2)};
  }
`;

export const TimeCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${vw(12)};
`;

export const AmPmGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${vw(6)};
`;

export const AmPmButton = styled.div`
  width: ${vw(96)};
  height: ${vw(40)};
  border-radius: ${vw(20)};
  border: ${vw(2)} solid
    ${({ $active }) => ($active ? "rgba(126, 141, 245, 0.9)" : "rgba(126, 141, 245, 0.35)")};
  background: ${({ $active }) =>
    $active
      ? "linear-gradient(180deg, rgba(126, 141, 245, 0.22) 0%, rgba(111, 123, 245, 0.35) 100%)"
      : "rgba(255, 255, 255, 0.8)"};
  color: ${({ $active }) => ($active ? "#5a64dd" : "#98a2f0")};
  font-family: Pretendard;
  font-size: ${vw(16)};
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ $active }) =>
    $active ? `0 ${vw(4)} ${vw(10)} rgba(117, 129, 245, 0.25)` : "none"};
  transition: all 0.2s ease;
`;

export const TimeText = styled.div`
  font-size: ${vw(40)};
  color: #6874f6;
  font-weight: 800;
  letter-spacing: -0.02em;
`;

export const MainCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${vw(10)};
`;

export const TitlePill = styled.div`
  height: ${vw(56)};
  border-radius: ${vw(28)};
  border: ${vw(2)} solid #b4bfff;
  background: linear-gradient(180deg, #f5f7ff 0%, #eef1ff 100%);
  color: #6e79f2;
  font-weight: 800;
  display: flex;
  align-items: center;
  padding: 0 ${vw(16)};
  box-shadow: inset 0 ${vw(2)} ${vw(6)} rgba(126, 141, 245, 0.15);
`;

export const TagRow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${vw(10)};
  color: #6f6f6f;
  font-weight: 600;
  font-size: ${vw(16)};
`;

export const TagDot = styled.span`
  width: ${vw(18)};
  height: ${vw(18)};
  border-radius: ${vw(6)};
  background: linear-gradient(180deg, #ffe9a9 0%, #ffd770 100%);
  display: inline-block;
`;

export const ActionsCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  gap: ${vw(8)};
`;

export const SmallBtn = styled.button`
  height: ${vw(36)};
  border-radius: ${vw(18)};
  border: ${vw(2)} solid #7e8df5;
  background: linear-gradient(
    180deg,
    rgba(126, 141, 245, 0.12) 0%,
    rgba(126, 141, 245, 0.06) 100%
  );
  color: #7e8df5;
  font-weight: 800;
  padding: 0 ${vw(12)};
  min-width: ${vw(120)};
  transition: filter 0.2s ease, box-shadow 0.2s ease;
  &:hover {
    filter: brightness(1.02);
    box-shadow: 0 ${vw(2)} ${vw(8)} rgba(126, 141, 245, 0.15);
  }
`;

export const SecondaryBtn = styled(SmallBtn)`
  border-color: rgba(126,141,245,0.45);
`;

export const BottomBar = styled.div`
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ConfirmBtn = styled(SmallBtn)`
  width: ${vw(280)};
  height: ${vw(56)};
  font-size: ${vw(18)};
  border-radius: ${vw(32)};
`;

export const CloseFloating = styled.button`
  position: absolute;
  top: ${vw(14)};
  right: ${vw(18)};
  width: ${vw(56)};
  height: ${vw(56)};
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: ${vw(34)};
  color: #7e8df5;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 5;
  &:hover { background: rgba(126, 141, 245, 0.1); }
`;


