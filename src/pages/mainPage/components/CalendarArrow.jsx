import { useState } from "react";
import * as S from "../styles/CalendarArrow.style";

import PREV_DEFAULT from "@/assets/calendar/prev.svg";
import PREV_HOVER from "@/assets/calendar/prev-hover.svg";
import PREV_ACTIVE from "@/assets/calendar/prev-click.svg";

import NEXT_DEFAULT from "@/assets/calendar/next.svg";
import NEXT_HOVER from "@/assets/calendar/next-hover.svg";
import NEXT_ACTIVE from "@/assets/calendar/next-click.svg";

const CalendarArrow = ({
  onPrev,
  onNext,
  width = 35,
  height = 46,
  gap = 80,
}) => {
  const [prevSrc, setPrevSrc] = useState(PREV_DEFAULT);
  const [nextSrc, setNextSrc] = useState(NEXT_DEFAULT);

  return (
    <S.CalenderArrowContainer $gap={gap}>
      <S.ArrowImg
        src={prevSrc}
        $width={width}
        $height={height}
        onClick={onPrev}
        onMouseEnter={() => setPrevSrc(PREV_HOVER)}
        onMouseLeave={() => setPrevSrc(PREV_DEFAULT)}
        onMouseDown={() => setPrevSrc(PREV_ACTIVE)}
        onMouseUp={() => setPrevSrc(PREV_HOVER)}
      />

      <S.ArrowImg
        src={nextSrc}
        $width={width}
        $height={height}
        onClick={onNext}
        onMouseEnter={() => setNextSrc(NEXT_HOVER)}
        onMouseLeave={() => setNextSrc(NEXT_DEFAULT)}
        onMouseDown={() => setNextSrc(NEXT_ACTIVE)}
        onMouseUp={() => setNextSrc(NEXT_HOVER)}
      />
    </S.CalenderArrowContainer>
  );
};

export default CalendarArrow;
