import * as S from "../styles/MainLeftSection.style";
import MiniCalendar from "./MiniCalendar";

import LOGO from "@/assets/main/logo.svg";
import TODAY from "@/assets/main/todayDate.svg";
import TAG from "@/assets/main/tag.svg";
import LINE from "@/assets/miniCalendar/line.svg";

const days = [
  "일요일",
  "월요일",
  "화요일",
  "수요일",
  "목요일",
  "금요일",
  "토요일",
];

const MainLeftSection = () => {
  const today = new Date();

  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const day = days[today.getDay()];

  return (
    <>
      <S.LeftSectionContainer>
        <S.Logo src={LOGO} />
        <S.DateBox>
          <S.DateTop>
            <S.DateTitle>오늘 날짜</S.DateTitle>
          </S.DateTop>
          <S.DateBottom>
            <S.YearText>{year}년</S.YearText>
            <S.TodayBox>
              <S.TodayText>{month}월</S.TodayText>
              <S.TodayText>{date}일</S.TodayText>
              <S.Line src={LINE} />
              <S.TodayText>{day}</S.TodayText>
            </S.TodayBox>
          </S.DateBottom>
        </S.DateBox>
        <MiniCalendar />
        <S.TagBox src={TAG} />
      </S.LeftSectionContainer>
    </>
  );
};

export default MainLeftSection;
