import { useState } from "react";
import * as S from "./MainPage.style";
import MainCenterSection from "./components/MainCenterSection";
import MainLeftSection from "./components/MainLeftSection";
import MainRightSection from "./components/MainRightSection";
import RegisterModal from "@/components/modals/register/RegisterModal";

const MainPage = () => {
  const [selectedTag, setSelectedTag] = useState(null);
  const [registerOpen, setRegisterOpen] = useState(false);

  return (
    <>
      <S.MainContainer>
        <MainLeftSection
          setSelectedTag={setSelectedTag}
          selectedTag={selectedTag}
        />
        <MainCenterSection
          selectedTag={selectedTag}
          onOpenRegister={() => setRegisterOpen(true)}
        />
        <MainRightSection selectedTag={selectedTag} />
      </S.MainContainer>
      <RegisterModal
        open={registerOpen}
        onClose={() => setRegisterOpen(false)}
      />
    </>
  );
};

export default MainPage;
