import * as S from "../styles/MainCalendarArrow.style";

import PREV from "@/assets/calendar/prev.svg";
import NEXT from "@/assets/calendar/next-click.svg";
import { useState } from "react";

const MainCalendarArrow = () => {
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
      <S.CalenderArrowContainer>
        <S.ArrowImg src={PREV} onClick={handlePrevMonth} />
        <S.ArrowImg src={NEXT} onClick={handleNextMonth} />
      </S.CalenderArrowContainer>
    </>
  );
};

export default MainCalendarArrow;
