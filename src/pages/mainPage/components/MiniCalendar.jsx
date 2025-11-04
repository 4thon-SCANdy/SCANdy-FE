import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import * as S from "../styles/MiniCalendar.style";
import CalendarArrow from "./CalendarArrow";
import { useState } from "react";

const MiniCalendar = () => {
  const today = new Date();

  const [currentDate, setCurrentDate] = useState(today);
  const todayWeekday = today.getDay();

  const handlePrevMonth = () => {
    const prev = new Date(currentDate);
    prev.setMonth(currentDate.getMonth() - 1);
    setCurrentDate(prev);
  };

  const handleNextMonth = () => {
    const next = new Date(currentDate);
    next.setMonth(currentDate.getMonth() + 1);
    setCurrentDate(next);
  };

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
        <CalendarArrow
          width={14}
          height={19}
          gap={34}
          onPrev={handlePrevMonth}
          onNext={handleNextMonth}
        />
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

export default MiniCalendar;
