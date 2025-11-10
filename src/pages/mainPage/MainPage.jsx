import { useEffect, useState } from "react";
import * as S from "./MainPage.style";
import MainCenterSection from "./components/MainCenterSection";
import MainLeftSection from "./components/MainLeftSection";
import MainRightSection from "./components/MainRightSection";
import RegisterModal from "@/components/modals/register/RegisterModal";
import { useLocation } from "react-router-dom";
import GoogleSuccessModal from "../loginPage/components/GoogleSuccessModal";

const MainPage = () => {
  const location = useLocation();
  const [selectedTag, setSelectedTag] = useState(null);
  const [registerOpen, setRegisterOpen] = useState(false);

  const [modalInfo, setModalInfo] = useState({
    open: false,
    type: "success",
    email: "",
  });

  useEffect(() => {
    if (location.state?.success !== undefined) {
      setModalInfo({
        open: true,
        type: location.state.success ? "success" : "fail",
        email: location.state.email || "",
      });
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

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

      {modalInfo.open && (
        <GoogleSuccessModal
          type={modalInfo.type}
          email={modalInfo.email}
          onClose={() =>
            setModalInfo({ open: false, type: "success", email: "" })
          }
        />
      )}
    </>
  );
};

export default MainPage;
