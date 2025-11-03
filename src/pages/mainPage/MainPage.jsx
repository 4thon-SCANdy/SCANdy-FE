import * as S from "./MainPage.style";
import MainCenterSection from "./components/MainCenterSection";
import MainLeftSection from "./components/MainLeftSection";
import MainRightSection from "./components/MainRightSection";

const MainPage = () => {
  return (
    <>
      <S.MainContainer>
        <MainLeftSection />
        <MainCenterSection />
        <MainRightSection />
      </S.MainContainer>
    </>
  );
};

export default MainPage;
