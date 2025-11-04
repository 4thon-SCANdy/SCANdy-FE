import { useState } from "react";
import * as S from "./MainPage.style";
import MainCenterSection from "./components/MainCenterSection";
import MainLeftSection from "./components/MainLeftSection";
import MainRightSection from "./components/MainRightSection";

const MainPage = () => {
  const [selectedTag, setSelectedTag] = useState(null);

  return (
    <>
      <S.MainContainer>
        <MainLeftSection
          setSelectedTag={setSelectedTag}
          selectedTag={selectedTag}
        />
        <MainCenterSection selectedTag={selectedTag} />
        <MainRightSection selectedTag={selectedTag} />
      </S.MainContainer>
    </>
  );
};

export default MainPage;
