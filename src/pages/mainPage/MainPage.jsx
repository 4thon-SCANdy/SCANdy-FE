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

  const [tags, setTags] = useState([
    { id: 1, name: "개인 일정", color: "#A0D4FF" },
    { id: 2, name: "회의", color: "#FFEBB5" },
    { id: 3, name: "프로젝트", color: "#D9C9FF" },
  ]);

  const [schedules, setSchedules] = useState([
    { id: 1, date: "2025-11-10", tag: "회의" },
    { id: 2, date: "2025-11-12", tag: "프로젝트" },
    { id: 3, date: "2025-11-13", tag: "개인 일정" },
  ]);

  const handleRenameTag = (oldName, newName) => {
    setSchedules((prev) =>
      prev.map((s) => (s.tag === oldName ? { ...s, tag: newName } : s))
    );
  };

  return (
    <>
      <S.MainContainer>
        <MainLeftSection
          tags={tags}
          setTags={setTags}
          setSelectedTag={setSelectedTag}
          selectedTag={selectedTag}
          onRenameTag={handleRenameTag}
        />
        <MainCenterSection
          tags={tags}
          schedules={schedules}
          selectedTag={selectedTag}
          onOpenRegister={() => setRegisterOpen(true)}
        />
        <MainRightSection
          tags={tags}
          schedules={schedules}
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
