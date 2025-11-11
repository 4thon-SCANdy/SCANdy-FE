import { useEffect, useState } from "react";
import * as S from "./MainPage.style";
import MainCenterSection from "./components/MainCenterSection";
import MainLeftSection from "./components/MainLeftSection";
import MainRightSection from "./components/MainRightSection";
import RegisterModal from "@/components/modals/register/RegisterModal";
import { useLocation } from "react-router-dom";
import GoogleSuccessModal from "../loginPage/components/GoogleSuccessModal";
import GoogleModal from "../loginPage/components/GoogleModal";
import googleSyncApi from "@/apis/auth/googleSyncApi";
import tagGetApi from "@/apis/tag/tagGetApi";
import allPlanGetApi from "@/apis/main/allPlanGetApi";

const MainPage = () => {
  const location = useLocation();
  const [selectedTag, setSelectedTag] = useState(null);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [googleModalOpen, setGoogleModalOpen] = useState(false);

  const [isGoogleSynced, setIsGoogleSynced] = useState(false);

  const [tags, setTags] = useState([]);

  const DEFAULT_TAGS = [
    { id: "default-1", name: "학업", color: "#FFEBB5" },
    { id: "default-2", name: "일상", color: "#D9C9FF" },
    { id: "default-3", name: "건강", color: "#A0D4FF" },
  ];

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await tagGetApi();

        const fetchedTags = Array.isArray(res.data?.data) ? res.data.data : [];

        const mergedTags = [
          ...DEFAULT_TAGS,
          ...fetchedTags.filter(
            (tag) => !DEFAULT_TAGS.some((d) => d.name === tag.name)
          ),
        ];

        setTags(mergedTags);
        console.log("태그 불러오기 성공: ", mergedTags);
      } catch (error) {
        console.error("태그 불러오기 실패: ", error);
        setTags(DEFAULT_TAGS);
      }
    };

    fetchTags();
  }, []);

  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const res = await allPlanGetApi();
        console.log("일정 조회 완료: ", res);

        const fetched = Array.isArray(res.data?.data)
          ? res.data.data
          : Array.isArray(res.data)
          ? res.data
          : [];

        setSchedules(fetched);
      } catch (err) {
        console.error("일정 조회 실패: ", err);
        setSchedules([]);
      }
    };

    fetchSchedules();
  }, []);

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
          onOpenRegister={() => setRegisterOpen(true)}
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
      />

      {modalInfo.open && (
        <GoogleSuccessModal
          type={modalInfo.type}
          email={modalInfo.email}
          onClose={() => {
            setModalInfo({ open: false, type: "success", email: "" });

            // 실패 시 로그인 페이지로 리다이렉트
            if (modalInfo.type === "fail") {
              window.location.href = "/login";
            }
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
