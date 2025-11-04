import styled from "styled-components";
import "react-calendar/dist/Calendar.css";
import { vw } from "@/utils/units";

export const CalendarContainer = styled.div`
  width: ${vw(355)};
  border-radius: ${vw(20)};
  overflow: visible;
  background: #fcfcfc;

  .react-calendar {
    width: 100%;
    height: 100%;
    border: none;
    background: transparent;
  }

  .react-calendar__month-view {
    padding: ${vw(14)} ${vw(18)} ${vw(18)} ${vw(18)};

    abbr {
      color: #7e8df5;
      font-size: ${vw(15)};
      font-weight: 500;
    }
  }

  .react-calendar__month-view__days {
    display: grid !important;
    grid-template-columns: repeat(7, ${vw(32)});
    justify-content: center;
    column-gap: ${vw(17)};
    row-gap: ${vw(2)};
  }

  .react-calendar__month-view__weekdays {
    display: grid !important;
    grid-template-columns: repeat(7, ${vw(32)});
    justify-content: center;
    column-gap: ${vw(17)};
    row-gap: ${vw(2)};
    background: #f4f6ff;

    margin-left: -${vw(18)};
    margin-right: -${vw(18)};
    margin-bottom: ${vw(2)};

    font-size: ${vw(12)};
    font-weight: 500;
    color: #4842b2;
  }

  .react-calendar__month-view__weekdays__weekday abbr {
    text-decoration: none !important;
  }

  .react-calendar__tile {
    text-align: center;
    height: ${vw(32)};
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }

  .react-calendar__tile:hover {
    background: #f2f4ff;
    border-radius: ${vw(6)};
  }

  .react-calendar__tile:enabled:active,
  .react-calendar__tile--active {
    background: inherit !important;
    color: inherit !important;
    box-shadow: none !important;
    outline: none !important;
  }

  .react-calendar__tile--active {
    background: transparent;
    cursor: pointer;
  }

  .react-calendar__tile {
    text-align: center;
    width: ${vw(32)} !important;
    height: ${vw(32)};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 !important;
  }

  /*hover, focus, 선택됐을 시 */
  .react-calendar__tile:enabled:focus,
  .react-calendar__tile--active {
    background: transparent;
  }

  .react-calendar__tile--now {
    border-radius: ${vw(6)};
    border: ${vw(1)} solid #b4bfff;
    background: #eaedff !important;
  }

  /*hover, focus 시 */
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: #f4f6ff;
  }

  /* 주말 요일 */
  .react-calendar__month-view__weekdays__weekday:nth-child(1) abbr,
  .react-calendar__month-view__weekdays__weekday:nth-child(7) abbr {
    color: #4842b2; /* 주말 색 */
  }

  /* 주말 날짜 */
  .react-calendar__month-view__days__day:nth-child(7n + 1) abbr,
  .react-calendar__month-view__days__day:nth-child(7n) abbr {
    color: #4842b2; /* 주말 날짜색 */
  }
`;

export const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: ${vw(355)};
  height: ${vw(74)};
  flex-shrink: 0;
  background: linear-gradient(90deg, #eaedff 0%, #b4bfff 147.61%);
  padding-left: ${vw(13)};
  padding-right: ${vw(25)};
  border-radius: ${vw(20)} ${vw(20)} 0 0;
`;

export const DateTextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${vw(2)};
  margin-top: ${vw(10)};
`;

export const YearText = styled.p`
  color: #7e8df5;
  font-family: Pretendard;
  font-size: ${vw(12)};
  font-style: normal;
  font-weight: 500;
  line-height: 100%; /* 12px */
  letter-spacing: -0.3px;
`;

export const MonthBox = styled.div`
  display: flex;
  align-items: center;
  gap: ${vw(5)};
`;

export const MonthKor = styled.p`
  color: #4842b2;
  font-family: Pretendard;
  font-size: ${vw(22)};
  font-style: normal;
  font-weight: 500;
  line-height: 100%; /* 22px */
  letter-spacing: -0.55px;
`;

export const MonthEng = styled.p`
  color: #4842b2;
  font-family: Pretendard;
  font-size: ${vw(20)};
  font-style: normal;
  font-weight: 500;
  line-height: 100%; /* 20px */
  letter-spacing: -0.5px;
`;
