import * as S from "../styles/MainLeftSection.style";

import MiniCalendar from "./MiniCalendar";

import LOGO from "@/assets/main/logo.svg";
import LINE from "@/assets/Calendar/line.svg";
import SETTING from "@/assets/main/setting.svg";
import EDIT from "@/assets/main/tagedit.svg";
import EDITING from "@/assets/main/tagediting.svg";

import { useState } from "react";
import ColorChip from "../../../components/colorchip/ColorChip";

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
  const [activeColorTag, setActiveColorTag] = useState(null);

  const [selectedTagId, setSelectedTagId] = useState(null);

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

  const [tags, setTags] = useState([
    { id: 1, color: "#A0D4FF" },
    { id: 2, color: "#FFEBB5" },
    { id: 3, color: "#D9C9FF" },
  ]);

  const handleTagChange = (id, value) => {
    setEditedTags((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleCheckClick = (tag) => {
    if (isEditActive === tag.id) {
      setActiveColorTag((prev) => (prev === tag.id ? null : tag.id));
    } else {
      setSelectedTagId((prev) => (prev === tag.id ? null : tag.id));
    }
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
                    $isSelected={selectedTagId === tag.id}
                    $color={tag.color}
                    onClick={() => handleCheckClick(tag)}
                  />
                  {activeColorTag === tag.id && (
                    <S.ColorChipWrapper>
                      <ColorChip
                        onSelect={(color) => {
                          setTags((prev) =>
                            prev.map((t) =>
                              t.id === tag.id ? { ...t, color } : t
                            )
                          );
                          setActiveColorTag(null);
                        }}
                      />
                    </S.ColorChipWrapper>
                  )}

                  {isEditActive === tag.id ? (
                    <S.EditInput
                      type="text"
                      value={editedTags[tag.id]}
                      autoFocus
                      onChange={(e) => handleTagChange(tag.id, e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && setIsEditActive(null)
                      }
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
