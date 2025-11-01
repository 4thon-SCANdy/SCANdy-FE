import * as S from "../styles/MainCenterSection.style";
import { useState } from "react";

import MainCalendar from "./MainCalendar";
import MainCalendarArrow from "./MainCalendarArrow";
import SearchBar from "./SearchBar";

const MainCenterSection = () => {
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
          <MainCalendarArrow
            currentDate={currentDate}
            onPrev={handlePrevMonth}
            onNext={handleNextMonth}
          />
        </S.CenterHeader>
        <MainCalendar currentDate={currentDate} />
      </S.CenterSectionContainer>
    </>
  );
};

export default MainCenterSection;
