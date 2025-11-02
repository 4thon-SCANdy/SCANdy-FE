import * as S from "./MainPage.style";
import MainCalendar from "./components/MainCalendar";
import MainLeftSection from "./components/MainLeftSection";
import MainRightSection from "./components/MainRightSection";

const MainPage = () => {
  return (
    <>
      <S.MainContainer>
        <MainLeftSection />
        <MainCalendar currentDate={new Date()} />
        <MainRightSection />
      </S.MainContainer>
    </>
  );
};

export default MainPage;
