import * as S from "../styles/MainCenterSection.style";
import { useState } from "react";

import MainCalendar from "./MainCalendar";
import CalendarArrow from "./CalendarArrow";
import SearchBar from "./SearchBar";
import { calendarSearchApi } from "../../../apis/calendar/calendarSearchApi";

const MainCenterSection = ({
  tags,
  schedules,
  selectedTag,
  onOpenRegister,
  onOpenScheduleList,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [searchMode, setSearchMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const getMonthRange = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const start = new Date(year, month, 1).toISOString().split("T")[0];
    const end = new Date(year, month + 1, 0).toISOString().split("T")[0];
    return { start, end };
  };
  const handlePrevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  const handleSearch = async (v) => {
    setSearchQuery(v);
    if (!v) {
      setSearchResult([]); // 검색어 없으면 초기화
      return;
    }

    const { start, end } = getMonthRange(currentDate);
    try {
      const data = await calendarSearchApi(v, start, end);

      if (data?.data?.length) {
        setSearchResult(data.data);
        setSearchMode(false);
      } else {
        setSearchResult([]); // 일정 없을 경우
        setSearchMode(true);
      }
    } catch (e) {
      console.error("검색 실패", e);
      setSearchResult([]);
      setSearchMode(true);
    }
  };

  return (
    <>
      <S.CenterSectionContainer>
        <S.CenterHeader>
          <SearchBar
            onFocus={() => setSearchMode(true)}
            onBlur={() => setSearchMode(false)}
            onSearch={handleSearch}
          />
          <CalendarArrow
            currentDate={currentDate}
            onPrev={handlePrevMonth}
            onNext={handleNextMonth}
          />
        </S.CenterHeader>
        <MainCalendar
          tags={tags}
          schedules={searchResult.length ? searchResult : schedules}
          currentDate={currentDate}
          selectedTag={selectedTag}
          onOpenRegister={onOpenRegister}
          onOpenScheduleList={onOpenScheduleList}
          searchMode={searchMode}
          searchQuery={searchQuery}
        />
      </S.CenterSectionContainer>
    </>
  );
};

export default MainCenterSection;
