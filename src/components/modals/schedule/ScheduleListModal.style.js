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

export const TabRow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${vw(12)};
  margin: ${vw(6)} 0 ${vw(12)};
`;

export const Tab = styled.div`
  width: ${vw(300)};
  height: ${vw(56)};
  border-radius: ${vw(32)};
  border: ${vw(2)} solid rgba(126, 141, 245, 0.6);
  background: linear-gradient(180deg, #f7f8ff 0%, #ffffff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #7e8df5;
  font-weight: 800;
  font-size: ${vw(18)};
`;

// 상단 탭을 하나의 분할 컨트롤처럼 보이도록
export const Segmented = styled.div`
  flex: 1;
  height: ${vw(56)};
  border-radius: ${vw(32)};
  border: ${vw(2)} solid rgba(126, 141, 245, 0.6);
  background: linear-gradient(180deg, #f7f8ff 0%, #ffffff 100%);
  display: flex;
  overflow: hidden;
`;

export const SegBtn = styled.button`
  flex: 1;
  height: 100%;
  border: none;
  background: transparent;
  color: #7e8df5;
  font-weight: 800;
  font-size: ${vw(18)};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${vw(8)};
  &:not(:last-child) {
    border-right: ${vw(2)} solid rgba(126, 141, 245, 0.3);
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
  grid-template-columns: ${vw(120)} 1fr ${vw(220)};
  gap: ${vw(14)};
  align-items: center;
  border-radius: ${vw(20)};
  border: ${vw(2)} solid rgba(126, 141, 245, 0.35);
  background: linear-gradient(180deg, #fafbff 0%, #ffffff 100%);
  padding: ${vw(14)};
`;

export const TimeCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${vw(8)};
`;

export const AmPm = styled.div`
  width: ${vw(84)};
  height: ${vw(36)};
  border-radius: ${vw(18)};
  border: ${vw(2)} solid #b4bfff;
  background: #fff;
  color: #7e8df5;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TimeText = styled.div`
  font-size: ${vw(32)};
  color: #7e8df5;
  font-weight: 800;
`;

export const MainCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${vw(10)};
`;

export const TitlePill = styled.div`
  height: ${vw(56)};
  border-radius: ${vw(16)};
  border: ${vw(2)} solid #b4bfff;
  background: #fff;
  color: #7e8df5;
  font-weight: 800;
  display: flex;
  align-items: center;
  padding: 0 ${vw(16)};
`;

export const TagRow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${vw(8)};
  color: #7e8df5;
  font-weight: 700;
`;

export const TagDot = styled.span`
  width: ${vw(14)};
  height: ${vw(14)};
  border-radius: 50%;
  background: #ffe28c;
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
  background: #ffffff;
  color: #7e8df5;
  font-weight: 800;
  padding: 0 ${vw(16)};
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


