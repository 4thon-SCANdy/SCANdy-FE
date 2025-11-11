import * as S from "../styles/MainLeftSection.style";

import MiniCalendar from "./MiniCalendar";

import LOGO from "@/assets/main/logo.svg";
import LINE from "@/assets/Calendar/line.svg";
import SETTING from "@/assets/main/setting.svg";
import EDIT from "@/assets/main/tagedit.svg";
import EDITING from "@/assets/main/tagediting.svg";

import { useEffect, useState } from "react";
import ColorChip from "../../../components/colorchip/ColorChip";
import tagEditApi from "../../../apis/tag/tagEditApi";

const days = [
  "일요일",
  "월요일",
  "화요일",
  "수요일",
  "목요일",
  "금요일",
  "토요일",
];

const MainLeftSection = ({
  tags,
  setTags,
  setSelectedTag,
  selectedTag,
  onRenameTag,
}) => {
  const [isSettingActive, setIsSettingActive] = useState(false);
  const [isEditActive, setIsEditActive] = useState(null);
  const [activeColorTag, setActiveColorTag] = useState(null);

  const [selectedTagId, setSelectedTagId] = useState(null);

  const today = new Date();

  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const day = days[today.getDay()];

  useEffect(() => {
    if (isEditActive === null) {
      setActiveColorTag(null);
    }
  }, [isEditActive]);

  const handleTagChange = async (id, newName) => {
    const oldName = tags.find((t) => t.id === id)?.name;
    setTags((prev) =>
      prev.map((tag) => (tag.id === id ? { ...tag, name: newName } : tag))
    );
    onRenameTag?.(oldName, newName);

    if (typeof id === "number") {
      try {
        const tag = tags.find((t) => t.id === id);
        const res = await tagEditApi(id, newName, tag.color, 13);
        console.log("태그 수정 성공: ", res.detail);
      } catch (error) {
        console.error("태그 수정 실패: ", error);
      }
    }
  };

  const handleCheckClick = (tag) => {
    if (isEditActive === tag.id) {
      setActiveColorTag((prev) => (prev === tag.id ? null : tag.id));
    } else {
      setSelectedTagId((prev) => (prev === tag.id ? null : tag.id));
      setSelectedTag((prev) => (prev === tag.name ? null : tag.name));
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
                    $isSelected={
                      selectedTagId === null || selectedTagId === tag.id
                    }
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
                    <S.TodoText>{tag.name}</S.TodoText>
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
