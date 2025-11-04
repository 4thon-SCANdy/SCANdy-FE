import * as S from "../styles/MainLeftSection.style";

import MiniCalendar from "./MiniCalendar";

import LOGO from "@/assets/main/logo.svg";
import LINE from "@/assets/Calendar/line.svg";

const days = [
  "일요일",
  "월요일",
  "화요일",
  "수요일",
  "목요일",
  "금요일",
  "토요일",
];

const MainLeftSection = ({ setSelectedTag, selectedTag }) => {
  const today = new Date();

  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const day = days[today.getDay()];

  const tags = [
    { id: 1, name: "개인 일정", color: "#A0D4FF" },
    { id: 2, name: "회의", color: "#FFEBB5" },
    { id: 3, name: "프로젝트", color: "#D9C9FF" },
  ];

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

        <S.TagBox>
          <S.TagTop>
            <S.TagTitle>내 태그</S.TagTitle>
          </S.TagTop>
          <S.TagBottom>
            {tags.map((tag) => (
              <S.TodoList key={tag.id}>
                <S.CheckBox
                  $isSelected={selectedTag === tag.name}
                  $color={tag.color}
                  onClick={() =>
                    setSelectedTag((prev) =>
                      prev === tag.name ? null : tag.name
                    )
                  }
                />{" "}
                <S.TodoText>{tag.name}</S.TodoText>
              </S.TodoList>
            ))}
          </S.TagBottom>
        </S.TagBox>
      </S.LeftSectionContainer>
    </>
  );
};

export default MainLeftSection;
