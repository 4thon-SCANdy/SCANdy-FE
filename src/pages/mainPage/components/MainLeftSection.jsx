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

import { TAG_COLOR_MAP, getColorIndex } from "../../../constants/tagColorMap";

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
  isGoogleSynced,
}) => {
  const [isSettingActive, setIsSettingActive] = useState(false);
  const [isEditActive, setIsEditActive] = useState(null);
  const [activeColorTag, setActiveColorTag] = useState(null);

  const [selectedTagId, setSelectedTagId] = useState(null);
  const [editedTags, setEditedTags] = useState({});

  const USER_ID = sessionStorage.getItem("user_id");

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
    const isDefault = String(id).startsWith("default-");
    setEditedTags((prev) => ({ ...prev, [id]: newName }));

    const oldName = tags.find((t) => t.id === id)?.name;
    setTags((prev) =>
      prev.map((tag) => (tag.id === id ? { ...tag, name: newName } : tag))
    );
    onRenameTag?.(oldName, newName);

    if (isDefault) {
      console.log("기본 태그 수정: ", newName);
      return;
    }

    try {
      const tag = tags.find((t) => t.id === id);
      const res = await tagEditApi(id, newName, tag.color, USER_ID);
      console.log("태그 수정 성공: ", res.detail);
    } catch (error) {
      console.error("태그 수정 실패: ", error);
    }
  };

  const handleColorChange = async (tag, newHex) => {
    if (isGoogleSynced) {
      console.log("Google 연동 중에는 색상 변경이 비활성화됩니다.");
      return;
    }

    const colorIndex = getColorIndex(newHex);
    if (colorIndex === null) return;

    setTags((prev) =>
      prev.map((t) => (t.id === tag.id ? { ...t, color: colorIndex } : t))
    );

    try {
      await tagEditApi(tag.id, tag.name, colorIndex, tag.calendar);
      console.log("색상 변경 성공");
    } catch (err) {
      console.error("색상 변경 실패: ", err);
    }
  };

  // tags가 변경될 때(새 태그 추가 등) 표시명이 비어 보이지 않도록 동기화
  useEffect(() => {
    setEditedTags((prev) => {
      const next = { ...prev };
      tags.forEach((t) => {
        if (!next[t.id]) next[t.id] = t.name || "";
      });
      // 기존에 사라진 태그 키는 유지해도 무방; 제거하고 싶다면 아래 주석 해제
      // Object.keys(next).forEach((k) => {
      //   if (!tags.some((t) => String(t.id) === String(k))) delete next[k];
      // });
      return next;
    });
  }, [tags]);

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
                    $color={
                      typeof tag.color === "number"
                        ? TAG_COLOR_MAP[tag.color] // 사용자 태그
                        : tag.color || "#EAEAEA" // 디폴트 태그
                    }
                    onClick={() => handleCheckClick(tag)}
                  />

                  {activeColorTag === tag.id && !isGoogleSynced && (
                    <S.ColorChipWrapper>
                      <ColorChip
                        onSelect={(color) => handleColorChange(tag, color)}
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
                    <S.TodoText>{editedTags[tag.id] || tag.name}</S.TodoText>
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
