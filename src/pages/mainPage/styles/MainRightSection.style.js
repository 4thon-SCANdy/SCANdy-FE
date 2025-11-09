import styled from "styled-components";
import { vw } from "@/utils/units";

export const RightSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${vw(44)};
  padding-top: ${vw(60)};
`;

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
  cursor: pointer;
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

export const PlanBox = styled.div``;

export const BoxTop = styled.div`
  display: inline-flex;
  padding: ${vw(12)} ${vw(30)};
  justify-content: center;
  align-items: center;
  gap: ${vw(10)};
  border-radius: ${vw(20)} ${vw(20)} 0 0;
  background: #fdfdfd;
  box-shadow: 0 0 ${vw(20)} 0 rgba(180, 191, 255, 0.3);
`;

export const PlanTitle = styled.p`
  color: #4842b2;
  font-family: Pretendard;
  font-size: ${vw(16)};
  font-style: normal;
  font-weight: 600;
  line-height: 100%; /* 16px */
  letter-spacing: -0.4px;
`;

export const BoxBottom = styled.div`
  width: ${vw(355)};
  height: ${vw(910)};
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: ${vw(32)};
  background: #fdfdfd;
  box-shadow: 0 0 ${vw(20)} 0 rgba(180, 191, 255, 0.3);

  overflow-y: auto;
  padding-top: ${vw(52)};

  overflow-y: overlay;
  position: relative;

  &::-webkit-scrollbar {
    width: ${vw(6)};
    flex-shrink: 0;
  }

  &::-webkit-scrollbar-thumb {
    background: #7e8df5;
    border-radius: ${vw(10)};
  }

  &::-webkit-scrollbar-track {
    background: #eaedff;
    border-radius: ${vw(10)};
  }
`;

export const TodayBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TodayHeader = styled.div`
  width: ${vw(331)};
  height: ${vw(44)};
  padding-left: ${vw(15)};
  display: flex;
  align-items: center;
  flex-shrink: 0;
  border-radius: ${vw(20)} 0 0 0;
  background: linear-gradient(90deg, #eaedff 0%, #b4bfff 147.61%);
  z-index: 1;
`;

export const TodayText = styled.p`
  color: ${(props) => (props.$isWeekend ? "#4842B2" : "#7E8DF5")};
  font-family: Pretendard;
  font-size: ${vw(24)};
  font-style: normal;
  font-weight: 500;
  line-height: 100%; /* 24px */
  letter-spacing: -0.6px;
`;

export const TodayContent = styled.div`
  width: ${vw(331)};
  height: ${vw(322)};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  border-radius: 0 0 0 20px;
  background: linear-gradient(180deg, #fdfdfd 0%, #eaedff 215.1%);
  gap: ${vw(17)};
  z-index: 0;
  overflow-y: auto;
  scrollbar-gutter: stable overlay;
  padding-top: ${vw(18)};
`;

export const ImgContent = styled.div`
  width: ${vw(331)};
  height: ${vw(322)};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 0 0 0 20px;
  background: linear-gradient(180deg, #fdfdfd 0%, #eaedff 215.1%);
  gap: ${vw(18)};
  z-index: 0;
  overflow-y: auto;
  scrollbar-gutter: stable overlay;
  padding-top: ${vw(18)};
`;

export const AndyImg = styled.img`
  width: ${vw(100)};
  height: ${vw(78)};
  flex-shrink: 0;
`;

export const PlusText = styled.p`
  color: #606060;
  font-family: Pretendard;
  font-size: ${vw(20)};
  font-style: normal;
  font-weight: 500;
  line-height: 100%; /* 20px */
  letter-spacing: -0.5px;
`;
