import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import * as S from "../styles/MiniCalendar.style";

const MiniCalendar = () => {
  return (
    <S.CalendarContainer>
      <Calendar
        locale="ko-KR"
        calendarType="gregory"
        prev2Label={null}
        next2Label={null}
        formatDay={(locale, date) => date.getDate()}
      />
    </S.CalendarContainer>
  );
};

export default MiniCalendar;
