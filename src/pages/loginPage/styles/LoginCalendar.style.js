import styled from "styled-components";
import "react-calendar/dist/Calendar.css";
import { vw } from "@/utils/units";

export const CalendarContainer = styled.div`
  width: ${vw(710)};
  border-radius: ${vw(40)};
  overflow: visible;
  background: #fcfcfc;

  .react-calendar {
    width: 100%;
    height: 100%;
    border: none;
    background: transparent;
  }

  .react-calendar__month-view {
    padding: ${vw(28)} ${vw(28)} ${vw(36)} ${vw(28)};
    box-shadow: 0 0 40px 0 rgba(180, 191, 255, 0.3);

    abbr {
      color: #7e8df5;
      font-size: ${vw(30)};
      font-weight: 500;
    }
  }

  .react-calendar__month-view__days {
    display: grid !important;
    grid-template-columns: repeat(7, ${vw(64)});
    justify-content: center;
    column-gap: ${vw(34)};
    row-gap: ${vw(4)};
  }

  .react-calendar__month-view__weekdays {
    display: grid !important;
    grid-template-columns: repeat(7, ${vw(64)});
    justify-content: center;
    column-gap: ${vw(34)};
    row-gap: ${vw(4)};
    background: #f4f6ff;

    margin-left: -${vw(36)};
    margin-right: -${vw(36)};
    margin-bottom: ${vw(4)};

    padding-top: ${vw(10)};
    padding-bottom: ${vw(10)};

    font-size: ${vw(24)};
    font-weight: 500;
    color: #4842b2;
  }

  .react-calendar__month-view__weekdays__weekday abbr {
    text-decoration: none !important;
  }

  .react-calendar__tile {
    text-align: center;
    height: ${vw(64)};
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }

  .react-calendar__tile:hover {
    background: #f2f4ff;
    border-radius: ${vw(12)};
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
    width: ${vw(64)} !important;
    height: ${vw(64)};
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
    border-radius: ${vw(12)};
    border: ${vw(2)} solid #b4bfff;
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
  width: ${vw(710)};
  height: ${vw(148)};
  flex-shrink: 0;
  background: linear-gradient(90deg, #eaedff 0%, #b4bfff 147.61%);
  box-shadow: 0 0 40px 0 rgba(180, 191, 255, 0.3);
  padding-left: ${vw(26)};
  padding-right: ${vw(50)};
  border-radius: ${vw(40)} ${vw(40)} 0 0;
`;

export const DateTextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${vw(4)};
  margin-top: ${vw(20)};
`;

export const YearText = styled.p`
  color: #7e8df5;
  font-family: Pretendard;
  font-size: ${vw(24)};
  font-style: normal;
  font-weight: 500;
  line-height: 100%; /* 12px */
  letter-spacing: -0.3px;
`;

export const MonthBox = styled.div`
  display: flex;
  align-items: center;
  gap: ${vw(10)};
`;

export const MonthKor = styled.p`
  color: #4842b2;
  font-family: Pretendard;
  font-size: ${vw(44)};
  font-style: normal;
  font-weight: 500;
  line-height: 100%; /* 22px */
  letter-spacing: -0.55px;
`;

export const MonthEng = styled.p`
  color: #4842b2;
  font-family: Pretendard;
  font-size: ${vw(40)};
  font-style: normal;
  font-weight: 500;
  line-height: 100%; /* 20px */
  letter-spacing: -0.5px;
`;
