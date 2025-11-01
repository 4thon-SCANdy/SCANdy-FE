import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import * as S from "../styles/MainCalendar.style";
import { vw } from "@/utils/units";

const MainCalendar = ({ currentDate }) => {
  return (
    <S.MainCalendarContainer>
      <S.CalendarTop>
        <S.MonthText>{currentDate.getMonth() + 1}월</S.MonthText>
      </S.CalendarTop>
      <S.CalendarBottom>
        <Calendar
          locale="ko-KR"
          calendarType="gregory"
          showNavigation={false}
          prev2Label={null}
          next2Label={null}
          activeStartDate={currentDate}
          formatShortWeekday={(locale, date) =>
            ["일", "월", "화", "수", "목", "금", "토"][date.getDay()]
          }
          formatDay={(locale, date) => {
            const currentMonth = currentDate.getMonth();
            const isCurrentMonth = date.getMonth() === currentMonth;
            const day = date.getDay();
            const isWeekend = day === 0 || day === 6;

            // 색상 지정
            let dayColor = "#7E8DF5"; // 날짜 색
            let monthColor = "#7E8DF5"; // 월 색

            if (isWeekend) {
              dayColor = "#4842B2"; // 주말 날짜
              monthColor = "#7E8DF5"; // 주말 월
            }

            if (!isCurrentMonth) {
              dayColor = "#BDBDBD"; // 이번 달 아님 → 흐린 회색
              monthColor = "#BDBDBD"; // 월 글씨도 흐리게
            }

            return (
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  height: `${vw(24)}`,
                  gap: `${vw(1)}`,
                }}
              >
                <p
                  style={{
                    fontSize: `${vw(12)}`,
                    color: monthColor,
                  }}
                >
                  {date.getMonth() + 1}월
                </p>
                <p
                  style={{
                    fontSize: `${vw(18)}`,
                    fontWeight: 500,
                    color: dayColor,
                  }}
                >
                  {date.getDate()}일
                </p>
              </div>
            );
          }}
        />
      </S.CalendarBottom>
    </S.MainCalendarContainer>
  );
};

export default MainCalendar;
