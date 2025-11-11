import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import * as S from "../styles/MainCalendar.style";
import { vw } from "@/utils/units";
import PlanTag from "./PlanTag";
import { getTagColor as getColorFromMap } from "../../../constants/tagColorMap";

const MainCalendar = ({
  tags,
  schedules,
  currentDate,
  selectedTag,
  onOpenRegister,
}) => {
  const getTagColor = (tag) => {
    if (!tag) return "#EAEAEA";
    if (typeof tag === "object" && tag.color) return tag.color;
    const match = tags.find((t) => t.name === tag);
    return match ? match.color : getColorFromMap(tag.colorIndex ?? 0);
  };

  const visibleSchedules = Array.isArray(schedules)
    ? selectedTag
      ? schedules.filter((s) =>
          typeof s.tag === "object"
            ? s.tag.name === selectedTag
            : s.tag === selectedTag
        )
      : schedules
    : [];

  const formatDateKey = (date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;

  return (
    <S.MainCalendarContainer className="MainCalendar">
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
                  justifyContent: "flex-end",
                  alignItems: "flex-start",
                  height: `${vw(24)}`,
                  gap: `${vw(1)}`,
                }}
              >
                <p
                  style={{
                    fontSize: `${vw(12)}`,
                    color: monthColor,
                    marginLeft: `${vw(7)} ${vw(10)} 0 ${vw(2)}`,
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
          tileContent={({ date, view }) => {
            if (view !== "month") return null;

            const dayKey = formatDateKey(date);
            const dailySchedules = visibleSchedules.filter(
              (s) => s.date === dayKey
            );

            return (
              <>
                {dailySchedules.map((schedule) => (
                  <div
                    key={schedule.id}
                    style={{
                      position: "relative",
                      display: "flex",
                      justifyContent: "flex-end",
                      backgroundColor: "#FDFDFD",
                    }}
                  >
                    <PlanTag size="small" color={getTagColor(schedule.tag)}>
                      {schedule.title}
                    </PlanTag>
                  </div>
                ))}
                <S.PlusHitArea
                  role="button"
                  tabIndex={0}
                  aria-label="일정 등록하기"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onOpenRegister?.(date);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      e.stopPropagation();
                      onOpenRegister?.(date);
                    }
                  }}
                />
              </>
            );
          }}
        />
      </S.CalendarBottom>
    </S.MainCalendarContainer>
  );
};

export default MainCalendar;
