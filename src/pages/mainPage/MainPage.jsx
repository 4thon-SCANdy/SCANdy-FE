import { useEffect, useState } from "react";
import * as S from "./MainPage.style";
import MainCenterSection from "./components/MainCenterSection";
import MainLeftSection from "./components/MainLeftSection";
import MainRightSection from "./components/MainRightSection";
import RegisterModal from "@/components/modals/register/RegisterModal";
import { useLocation } from "react-router-dom";
import GoogleSuccessModal from "../loginPage/components/GoogleSuccessModal";
import GoogleModal from "../loginPage/components/GoogleModal";
import googleSyncApi from "../../apis/auth/googleSyncApi";

const MainPage = () => {
  const location = useLocation();
  const [selectedTag, setSelectedTag] = useState(null);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [registerDate, setRegisterDate] = useState(null);
  const [googleModalOpen, setGoogleModalOpen] = useState(false);

  const [isGoogleSynced, setIsGoogleSynced] = useState(false);

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

  const [modalInfo, setModalInfo] = useState({
    open: false,
    type: "success",
    email: "",
  });

  useEffect(() => {
    const checkGoogleSync = async () => {
      try {
        const data = await googleSyncApi();
        console.log("구글 연동 여부: ", data.is_google_sync);
        setIsGoogleSynced(data.is_google_sync);
      } catch (error) {
        console.error("구글 연동 여부 확인 실패: ", error);
      }
    };

    checkGoogleSync();
  }, []);

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
          onOpenRegister={(date) => {
            setRegisterDate(date);
            setRegisterOpen(true);
          }}
        />
        <MainRightSection
          tags={tags}
          schedules={schedules}
          selectedTag={selectedTag}
          onOpenGoogle={() => setGoogleModalOpen(true)}
          isGoogleSynced={isGoogleSynced}
        />
      </S.MainContainer>
      <RegisterModal
        open={registerOpen}
        onClose={() => setRegisterOpen(false)}
        initialDate={registerDate}
        onCreated={(newItem) => {
          // 태그 존재 보장
          if (newItem?.tag && !tags.some((t) => t.name === newItem.tag)) {
            setTags((prev) => [
              ...prev,
              { id: Date.now(), name: newItem.tag, color: "#A0D4FF" },
            ]);
          }
          // 날짜 범위 전체 반영
          const start = new Date(newItem.startDate || newItem.date);
          const end = new Date(newItem.endDate || newItem.startDate || newItem.date);
          const acc = [];
          const cur = new Date(start);
          while (cur <= end) {
            const y = cur.getFullYear();
            const m = String(cur.getMonth() + 1).padStart(2, "0");
            const d = String(cur.getDate()).padStart(2, "0");
            acc.push({
              id: `${newItem.id}-${y}${m}${d}`,
              date: `${y}-${m}-${d}`,
              tag: newItem.tag,
              title: newItem.title,
            });
            cur.setDate(cur.getDate() + 1);
          }
          setSchedules((prev) => [...prev, ...acc]);
          setRegisterOpen(false);
        }}
      />

      {modalInfo.open && (
        <GoogleSuccessModal
          type={modalInfo.type}
          email={modalInfo.email}
          onClose={() => {
            setModalInfo({ open: false, type: "success", email: "" });

            // // 실패 시 로그인 페이지로 리다이렉트
            // if (modalInfo.type === "fail") {
            //   window.location.href = "/login";
            // }
          }}
        />
      )}

      {googleModalOpen && (
        <GoogleModal onClose={() => setGoogleModalOpen(false)} />
      )}
    </>
  );
};

export default MainPage;
