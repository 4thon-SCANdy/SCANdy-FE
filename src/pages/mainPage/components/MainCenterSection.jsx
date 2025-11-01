import * as S from "../styles/MainCenterSection.style";
import MainCalendar from "./MainCalendar";
import MainCalendarArrow from "./MainCalendarArrow";
import SearchBar from "./SearchBar";

const MainCenterSection = () => {
  return (
    <>
      <S.CenterSectionContainer>
        <S.CenterHeader>
          <SearchBar />
          <MainCalendarArrow />
        </S.CenterHeader>
        <MainCalendar />
      </S.CenterSectionContainer>
    </>
  );
};

export default MainCenterSection;
