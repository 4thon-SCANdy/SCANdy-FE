import * as S from "../styles/MainCenterSection.style";
import { useState } from "react";

import MainCalendar from "./MainCalendar";
import CalendarArrow from "./CalendarArrow";
import SearchBar from "./SearchBar";

const MainCenterSection = ({
  tags,
  schedules,
  selectedTag,
  onOpenRegister,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());

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

  return (
    <>
      <S.CenterSectionContainer>
        <S.CenterHeader>
          <SearchBar />
          <CalendarArrow
            currentDate={currentDate}
            onPrev={handlePrevMonth}
            onNext={handleNextMonth}
          />
        </S.CenterHeader>
        <MainCalendar
          tags={tags}
          schedules={schedules}
          currentDate={currentDate}
          selectedTag={selectedTag}
          onOpenRegister={onOpenRegister}
        />
      </S.CenterSectionContainer>
    </>
  );
};

export default MainCenterSection;
