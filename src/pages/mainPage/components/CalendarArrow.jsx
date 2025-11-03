import * as S from "../styles/CalendarArrow.style";

import PREV from "@/assets/calendar/prev.svg";
import NEXT from "@/assets/calendar/next-click.svg";

const CalendarArrow = ({
  onPrev,
  onNext,
  width = 35,
  height = 46,
  gap = 80,
}) => {
  return (
    <>
      <S.CalenderArrowContainer $gap={gap}>
        <S.ArrowImg
          src={PREV}
          onClick={onPrev}
          $width={width}
          $height={height}
        />
        <S.ArrowImg
          src={NEXT}
          onClick={onNext}
          $width={width}
          $height={height}
        />
      </S.CalenderArrowContainer>
    </>
  );
};

export default CalendarArrow;
