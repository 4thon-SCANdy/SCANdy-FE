import * as S from "../styles/MainCenterSection.style";
import { useState } from "react";

import MainCalendar from "./MainCalendar";
import CalendarArrow from "./CalendarArrow";
import SearchBar from "./SearchBar";
import calendarSearchApi from "../../../apis/calendar/calendarSearchApi";

const MainCenterSection = ({
  tags,
  schedules,
  selectedTag,
  onOpenRegister,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [searchMode, setSearchMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [highlightDates, setHighlightDates] = useState([]);

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
      setHighlightDates([]);
      return;
    }

    const { start, end } = getMonthRange(currentDate);
    try {
      const data = await calendarSearchApi(v, start, end);

      if (data?.data?.length) {
        const transformed = data.data.map((item) => ({
          ...item,
          date: item.start_datetime.split("T")[0],
        }));
        setSearchResult(transformed);
        setHighlightDates(transformed.map((s) => s.date));
        setSearchMode(false);
      } else {
        setSearchResult([]); // 일정 없을 경우
        setHighlightDates([]);
        setSearchMode(true);
      }
    } catch (e) {
      console.error("검색 실패", e);
      setSearchResult([]);
      setHighlightDates([]);
      setSearchMode(true);
    }
  };

  const displayedSchedules = searchMode ? searchResult : schedules;

  return (
    <>
      <S.CenterSectionContainer>
        <S.CenterHeader>
          <SearchBar
            onFocus={() => setSearchMode(true)}
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
          schedules={displayedSchedules}
          currentDate={currentDate}
          selectedTag={selectedTag}
          onOpenRegister={onOpenRegister}
          searchMode={searchMode}
          searchQuery={searchQuery}
          highlightDates={highlightDates}
        />
      </S.CenterSectionContainer>
    </>
  );
};

export default MainCenterSection;
