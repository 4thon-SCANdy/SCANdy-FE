import * as S from "../styles/MainLeftSection.style";

import LOGO from "@/assets/main/logo.svg";
import TODAY from "@/assets/main/todayDate.svg";
import TAG from "@/assets/main/tag.svg";
import MiniCalendar from "./MiniCalendar";

const MainLeftSection = () => {
  return (
    <>
      <S.LeftSectionContainer>
        <S.Logo src={LOGO} />
        <S.TodayDate src={TODAY} />
        <MiniCalendar />
        <S.TagBox src={TAG} />
      </S.LeftSectionContainer>
    </>
  );
};

export default MainLeftSection;
