import Calendar from "react-calendar";
import * as S from "../styles/MainCalendar.style";
import { vw } from "@/utils/units";

const MainCalendar = () => {
  return (
    <S.MainCalendarContainer>
      <Calendar
        locale="ko-KR"
        calendarType="gregory"
        showNavigation={false} // 🔹 월/년 헤더 제거
        prev2Label={null}
        next2Label={null}
        formatShortWeekday={(locale, date) =>
          ["일", "월", "화", "수", "목", "금", "토"][date.getDay()]
        }
        formatDay={(locale, date) => (
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              height: `${vw(24)}`,
              gap: `${vw(1)}`,
            }}
          >
            <span
              style={{
                fontSize: `${vw(12)}`, // 🔹 '몇월' 작게
                color: "#7E8DF5",
              }}
            >
              {date.getMonth() + 1}월
            </span>
            <span
              style={{
                fontSize: `${vw(18)}`,
                fontWeight: 500,
                color: "#7E8DF5",
              }}
            >
              {date.getDate()}일
            </span>
          </div>
        )}
      />
    </S.MainCalendarContainer>
  );
};

export default MainCalendar;
