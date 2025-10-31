import styled from "styled-components";
import { vw } from "@/utils/units";

export const MainCalendarContainer = styled.div`
  width: ${vw(1062)};
  height: ${vw(922)};
  flex-shrink: 0;
  border-radius: 0 ${vw(30)} 0 0;
  background: #f4f6ff;
  box-shadow: 0 0 ${vw(20)} 0 rgba(126, 141, 245, 0.2);
  overflow: hidden;

  .react-calendar {
    width: 100%;
    border: none;
    background: transparent;
  }

  /* 요일 줄 */
  .react-calendar__month-view__weekdays {
    height: ${vw(77)};
    margin-top: 0;
    margin-bottom: ${vw(4)};
    display: flex;
    align-items: center;
    font-size: ${vw(26)};
    color: #7e8df5;
  }

  /* 불필요한 여백 제거 */
  .react-calendar__month-view__days {
    margin: 0;
    padding: 0;
  }

  .react-calendar__tile {
    padding: 0; /* 내부 패딩 완전 제거 */
    margin: 0; /* 혹시 있을 여백도 제거 */
  }

  /* 날짜 칸 */
  .react-calendar__tile {
    width: ${vw(152)};
    height: ${vw(169)};
    font-size: ${vw(12)};
    border-radius: ${vw(6)};
    border-right: ${vw(1)} solid #eaedff;
    border-bottom: ${vw(1)} solid #eaedff;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    transition: 0.2s;
  }

  .react-calendar__tile::after {
    content: "";
    display: block;
    width: 100%;
    height: calc(100% - ${vw(24)}); /* 날짜(24px) 제외한 나머지 */
    background: #fdfdfd;
    border-top: ${vw(1)} solid #e0e3ff; /* 위쪽 분리선 */
    border-radius: 0 0 ${vw(6)} ${vw(6)};
  }

  /* 오늘 */
  .react-calendar__tile--now {
    border: ${vw(2)} solid #b4bfff;
    background: #eaedff;
    color: #7e8df5;
  }

  /* 선택 */
  .react-calendar__tile--active {
    background: linear-gradient(90deg, #b4bfff 0%, #7e8df5 100%);
    color: #fff;
  }
`;
