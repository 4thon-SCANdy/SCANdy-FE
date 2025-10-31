import styled from "styled-components";
import "react-calendar/dist/Calendar.css";
import { vw } from "@/utils/units";

import LEFT from "../../../assets/miniCalendar/prev.svg";
import LEFT_HOVER from "../../../assets/miniCalendar/prev-hover.svg";
import LEFT_CLICK from "../../../assets/miniCalendar/prev-click.svg";
import RIGHT from "../../../assets/miniCalendar/next.svg";
import RIGHT_HOVER from "../../../assets/miniCalendar/next-hover.svg";
import RIGHT_CLICK from "../../../assets/miniCalendar/next-click.svg";

export const CalendarContainer = styled.div`
  width: ${vw(355)};
  height: ${vw(308)};

  .react-calendar {
    width: ${vw(355)};
    height: ${vw(308)};
    border: none;
    background: transparent;
    overflow: hidden;
  }
  .react-calendar__month-view__weekdays {
    margin-top: ${vw(0)};
    background: #f4f6ff;
  }

  .react-calendar__month-view__weekdays__weekday {
    font-size: ${vw(11)};
    font-weight: 500;
    color: #7e8df5;
    text-align: center;
    padding: ${vw(6)} 0;
  }

  /* 주말 색 */
  .react-calendar__month-view__weekdays__weekday:nth-child(1) {
    color: #4842b2;
  }

  .react-calendar__navigation {
    width: ${vw(355)};
    height: ${vw(74)};
    margin-bottom: ${vw(14)};
    flex-shrink: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
    background: linear-gradient(90deg, #eaedff 0%, #b4bfff 147.61%);
  }

  /* 왼쪽 버튼 (이전 달) */
  .react-calendar__navigation__prev-button {
    width: ${vw(35)};
    height: ${vw(46)};
    color: transparent;
    background-image: url(${LEFT});
    border: none;
    transition: 0.2s;
  }

  .react-calendar__navigation__prev-button:hover {
    background-image: url(${LEFT_HOVER});
  }

  /* 오른쪽 버튼 (다음 달) */
  .react-calendar__navigation__next-button {
    width: ${vw(35)};
    height: ${vw(46)};
    color: transparent;
    background-image: url(${RIGHT});
    border: none;
    transition: 0.2s;
  }

  .react-calendar__navigation__next-button:hover {
    background-image: url(${RIGHT_HOVER});
  }

  .react-calendar__tile {
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${vw(32)};
    height: ${vw(32)}; /* 날짜 칸 높이 */
    font-size: ${vw(12)};
    border-radius: ${vw(6)};
  }

  /* 오늘 날짜 (기본 표시) */
  .react-calendar__tile--now {
    border-radius: ${vw(12)};
    border: ${vw(2)} solid #b4bfff;
    background: #eaedff;
    color: #7e8df5;
  }

  /* 오늘 날짜 hover 시 */
  .react-calendar__tile--now:hover {
    border-radius: ${vw(12)};
    background: #f4f6ff;
  }

  /* 선택된 날짜 */
  .react-calendar__tile--active {
    background: linear-gradient(90deg, #b4bfff 0%, #7e8df5 100%);
    border-radius: ${vw(12)};
  }

  /* 선택 + 오늘이 겹칠 때 */
  .react-calendar__tile--now.react-calendar__tile--active {
    border-radius: ${vw(12)};
  }
`;
