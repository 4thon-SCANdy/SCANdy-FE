import * as S from "../styles/MainRightSection.style";

import GOOGLE from "@/assets/main/google.svg";
import ANDY from "@/assets/main/andy.svg";
import PlanTag from "./PlanTag";

const MainRightSection = () => {
  // 오늘을 기준으로 일주일 단위 생성
  const today = new Date();
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    return date;
  });

  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const day = ["일", "월", "화", "수", "목", "금", "토"][today.getDay()];

  const schedules = [
    {
      id: 1,
      date: "2025-11-04",
      tag: "회의",
      color: "#FFEBB5",
    },
    {
      id: 2,
      date: "2025-11-04",
      tag: "프로젝트",
      color: "#D9C9FF",
    },
    {
      id: 3,
      date: "2025-11-06",
      tag: "디자인",
      color: "#A0D4FF",
    },
  ];

  const hasSchedule = schedules.length > 0;

  const formatDateKey = (date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;

  const formatDisplayDate = (date) => {
    const m = date.getMonth() + 1;
    const d = date.getDate();
    const dayIndex = date.getDay();
    const day = ["일", "월", "화", "수", "목", "금", "토"][dayIndex];
    return { text: `${m}월 ${d}일 ${day}요일`, dayIndex };
  };

  return (
    <S.RightSectionContainer>
      <S.GoogleBox>
        <S.GoogleImg src={GOOGLE} />
        <S.GoogleText>구글 연동</S.GoogleText>
      </S.GoogleBox>

      <S.PlanBox>
        <S.BoxTop>
          <S.PlanTitle>오늘의 일정</S.PlanTitle>
        </S.BoxTop>
        <S.BoxBottom>
          {weekDates.map((dateObj) => {
            const dateKey = formatDateKey(dateObj);
            const { text, dayIndex } = formatDisplayDate(dateObj);
            const isWeekend = dayIndex === 0 || dayIndex === 6;
            const daySchedules = schedules.filter(
              (item) => item.date === dateKey
            );

            return (
              <S.TodayBox key={dateKey}>
                <S.TodayHeader>
                  <S.TodayText $isWeekend={isWeekend}>{text}</S.TodayText>
                </S.TodayHeader>

                {daySchedules.length > 0 ? (
                  <S.TodayContent>
                    {daySchedules.map((schedule) => (
                      <div
                        key={schedule.id}
                        style={{
                          position: "relative",
                          display: "flex",
                          justifyContent: "flex-end",
                          backgroundColor: "#FDFDFD",
                        }}
                      >
                        <PlanTag size="large" color={schedule.color}>
                          {schedule.tag}
                        </PlanTag>
                      </div>
                    ))}
                  </S.TodayContent>
                ) : (
                  <S.ImgContent>
                    <S.AndyImg src={ANDY} />
                    <S.PlusText>캘린더에서 일정을 추가해 주세요!</S.PlusText>
                  </S.ImgContent>
                )}
              </S.TodayBox>
            );
          })}
        </S.BoxBottom>
      </S.PlanBox>
    </S.RightSectionContainer>
  );
};

export default MainRightSection;
