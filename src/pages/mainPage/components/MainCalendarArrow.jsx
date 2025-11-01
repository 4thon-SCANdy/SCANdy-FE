import * as S from "../styles/MainCalendarArrow.style";

import PREV from "@/assets/calendar/prev.svg";
import NEXT from "@/assets/calendar/next-click.svg";

const MainCalendarArrow = ({ onPrev, onNext }) => {
  return (
    <>
      <S.CalenderArrowContainer>
        <S.ArrowImg src={PREV} onClick={onPrev} />
        <S.ArrowImg src={NEXT} onClick={onNext} />
      </S.CalenderArrowContainer>
    </>
  );
};

export default MainCalendarArrow;
