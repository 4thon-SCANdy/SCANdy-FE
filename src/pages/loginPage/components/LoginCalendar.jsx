import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import * as S from "../styles/LoginCalendar.style";
import { useState } from "react";

const LoginCalendar = ({ monthOffset = 0 }) => {
  const today = new Date();

  const [currentDate] = useState(
    new Date(today.getFullYear(), today.getMonth() + monthOffset, 1)
  );

  return (
    <S.CalendarContainer>
      <S.CalendarHeader>
        <S.DateTextBox>
          <S.YearText>{currentDate.getFullYear()}</S.YearText>
          <S.MonthBox>
            <S.MonthKor>{currentDate.getMonth() + 1}월</S.MonthKor>
            <S.MonthEng>
              {currentDate.toLocaleString("en-US", { month: "long" })}
            </S.MonthEng>
          </S.MonthBox>
        </S.DateTextBox>
      </S.CalendarHeader>

      <Calendar
        locale="ko-KR"
        calendarType="gregory"
        value={currentDate}
        showNavigation={false}
        prev2Label={null}
        next2Label={null}
        formatShortWeekday={(locale, date) =>
          ["일", "월", "화", "수", "목", "금", "토"][date.getDay()]
        }
        formatDay={(locale, date) => date.getDate()}
      />
    </S.CalendarContainer>
  );
};

export default LoginCalendar;
