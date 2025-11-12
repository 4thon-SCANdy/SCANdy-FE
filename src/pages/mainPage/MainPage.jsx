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
import tagGetApi from "../../apis/tag/tagGetApi";
import allPlanGetApi from "../../apis/main/allPlanGetApi";
import { TAG_COLOR_MAP } from "../../constants/tagColorMap";

const MainPage = () => {
  const location = useLocation();
  const [selectedTag, setSelectedTag] = useState(null);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [registerDate, setRegisterDate] = useState(null);
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
              {
                id: Date.now(),
                name: newItem.tag,
                // 서버 스펙에 맞춰 사용자 태그는 color 인덱스(숫자)로 유지
                color:
                  typeof newItem.tagColorIndex === "number"
                    ? newItem.tagColorIndex
                    : 3, // 기본 인덱스(보라) fallback
              },
            ]);
          }
          // 날짜/반복 규칙에 따라 범위 확장
          const addRange = (s, e) => {
            const start = new Date(s);
            const end = new Date(e || s);
            const days = [];
            const cur = new Date(start);
            while (cur <= end) {
              const y = cur.getFullYear();
              const m = String(cur.getMonth() + 1).padStart(2, "0");
              const d = String(cur.getDate()).padStart(2, "0");
              days.push(`${y}-${m}-${d}`);
              cur.setDate(cur.getDate() + 1);
            }
            return days.map((date) => ({
              id: `${newItem.id}-${date}`,
              date,
              tag: newItem.tag,
              title: newItem.title,
            }));
          };

          const baseStart = newItem.startDate || newItem.date;
          const baseEnd = newItem.endDate || newItem.startDate || newItem.date;
          const repeat = newItem.repeat || "NONE";
          const until = newItem.until ? new Date(newItem.until) : null;

          let acc = [];
          if (repeat === "NONE" || !until) {
            acc = addRange(baseStart, baseEnd);
          } else if (repeat === "DAILY") {
            // 매일: 시작일부터 until일까지 매일 동일 태그 표시
            const cur = new Date(baseStart);
            while (cur <= until) {
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
          } else if (repeat === "WEEKLY") {
            // 매주: (시작~끝) 구간을 1주 간격으로 until까지 반복
            const start0 = new Date(baseStart);
            const end0 = new Date(baseEnd);
            let curStart = new Date(start0);
            let curEnd = new Date(end0);
            while (curStart <= until) {
              acc = acc.concat(
                addRange(
                  `${curStart.getFullYear()}-${String(
                    curStart.getMonth() + 1
                  ).padStart(2, "0")}-${String(curStart.getDate()).padStart(
                    2,
                    "0"
                  )}`,
                  `${curEnd.getFullYear()}-${String(
                    curEnd.getMonth() + 1
                  ).padStart(2, "0")}-${String(curEnd.getDate()).padStart(
                    2,
                    "0"
                  )}`
                )
              );
              curStart.setDate(curStart.getDate() + 7);
              curEnd.setDate(curEnd.getDate() + 7);
            }
          } else {
            // 다른 주기(MONTHLY/YEARLY)는 아직 미지원: 단일 구간만 표시
            acc = addRange(baseStart, baseEnd);
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
