import { useState } from "react";
import * as S from "./MainPage.style";
import MainCenterSection from "./components/MainCenterSection";
import MainLeftSection from "./components/MainLeftSection";
import MainRightSection from "./components/MainRightSection";
import RegisterModal from "@/components/modals/register/RegisterModal";
import GoogleModal from "../loginPage/components/GoogleModal";

const MainPage = () => {
  const [selectedTag, setSelectedTag] = useState(null);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [googleModalOpen, setGoogleModalOpen] = useState(false);

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
        <MainRightSection
          selectedTag={selectedTag}
          onOpenGoogle={() => setGoogleModalOpen(true)}
        />
      </S.MainContainer>
      <RegisterModal
        open={registerOpen}
        onClose={() => setRegisterOpen(false)}
      />
      {googleModalOpen && (
        <GoogleModal onClose={() => setGoogleModalOpen(false)} />
      )}
    </>
  );
};

export default MainPage;
