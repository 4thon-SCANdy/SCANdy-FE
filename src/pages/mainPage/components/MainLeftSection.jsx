import * as S from "../styles/MainLeftSection.style";

import MiniCalendar from "./MiniCalendar";

import LOGO from "@/assets/main/logo.svg";
import LINE from "@/assets/Calendar/line.svg";
import SETTING from "@/assets/main/setting.svg";
import EDIT from "@/assets/main/tagedit.svg";
import EDITING from "@/assets/main/tagediting.svg";

import { useState } from "react";

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
  const [isSettingActive, setIsSettingActive] = useState(false);
  const [isEditActive, setIsEditActive] = useState(null);
  const [editedTags, setEditedTags] = useState({
    1: "개인 일정",
    2: "회의",
    3: "프로젝트",
  });

  const today = new Date();

  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const day = days[today.getDay()];

  const tags = [
    { id: 1, color: "#A0D4FF" },
    { id: 2, color: "#FFEBB5" },
    { id: 3, color: "#D9C9FF" },
  ];

  const handleTagChange = (id, value) => {
    setEditedTags((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

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
          <S.TagHeader>
            <S.TagTop>
              <S.TagTitle>내 태그</S.TagTitle>
            </S.TagTop>
            <S.SettingBox onClick={() => setIsSettingActive((prev) => !prev)}>
              <S.SettingIcon src={SETTING} />
            </S.SettingBox>
          </S.TagHeader>
          <S.TagBottom>
            {tags.map((tag) => (
              <S.TodoList key={tag.id}>
                <S.TodoContainer>
                  <S.CheckBox
                    $isSelected={selectedTag === tag.name}
                    $color={tag.color}
                    onClick={() =>
                      setSelectedTag((prev) =>
                        prev === tag.name ? null : tag.name
                      )
                    }
                  />
                  {isEditActive === tag.id ? (
                    <S.EditInput
                      type="text"
                      value={editedTags[tag.id]}
                      autoFocus
                      onChange={(e) => handleTagChange(tag.id, e.target.value)}
                      onBlur={() => setIsEditActive(null)} // 포커스 아웃 시 종료
                      onKeyDown={(e) => {
                        if (e.key === "Enter") setIsEditActive(null);
                      }}
                    />
                  ) : (
                    <S.TodoText>{editedTags[tag.id]}</S.TodoText>
                  )}
                </S.TodoContainer>
                {isSettingActive && (
                  <S.TagEdit
                    src={isEditActive === tag.id ? EDITING : EDIT}
                    onClick={() =>
                      setIsEditActive((prev) =>
                        prev === tag.id ? null : tag.id
                      )
                    }
                  />
                )}
              </S.TodoList>
            ))}
          </S.TagBottom>
        </S.TagBox>
      </S.LeftSectionContainer>
    </>
  );
};

export default MainLeftSection;
