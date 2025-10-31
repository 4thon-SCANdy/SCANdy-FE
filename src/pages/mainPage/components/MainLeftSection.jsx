import CalendarItem from "../../../components/CalendarItem";
import * as S from "../styles/MainLeftSection.style";

import LOGO from "@/assets/main/logo.svg";
import TODAY from "@/assets/main/todayDate.svg";
import TAG from "@/assets/main/tag.svg";

const MainLeftSection = () => {
  return (
    <>
      <S.LeftSectionContainer>
        <S.Logo src={LOGO} />
        <S.TodayDate src={TODAY} />
        <CalendarItem />
        <S.TagBox src={TAG} />
      </S.LeftSectionContainer>
    </>
  );
};

export default MainLeftSection;
