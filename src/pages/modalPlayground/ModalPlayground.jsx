import { useState } from "react";
import * as S from "./ModalPlayground.style";
import { RegisterModal, ConflictModal, SearchModal, AnalyzeModal, ScheduleListModal } from "@/components/modals";

function ModalPlayground() {
  const [openReg, setOpenReg] = useState(false);
  const [openCon, setOpenCon] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [openAnalyze, setOpenAnalyze] = useState(false);
  const [analyzeImages, setAnalyzeImages] = useState([]); // object URLs
  const [openListCombined, setOpenListCombined] = useState(false);

  const demoItemsNoOriginal = [
    { id: "no-1", ampm: "AM", time: "10:30", title: "가나다라마바사", tagLabel: "개인 일정" },
  ];

  const demoItemsWithOriginal = [
    {
      id: "with-1",
      ampm: "PM",
      time: "03:00",
      title: "업무 미팅",
      tagLabel: "업무",
    },
  ];

  return (
    <S.Wrapper>
      <S.Title>Modal Playground</S.Title>
      <S.ButtonRow>
        <S.Button onClick={() => setOpenReg(true)}>일정 등록 모달</S.Button>
        <S.Button onClick={() => setOpenCon(true)}>일정 충돌 모달</S.Button>
        <S.Button onClick={() => setOpenSearch(true)}>일정 검색 모달</S.Button>
        <S.Button onClick={() => setOpenListCombined(true)}>일정 리스트 (혼합)</S.Button>
      </S.ButtonRow>

      <RegisterModal
        open={openReg}
        onClose={() => setOpenReg(false)}
        onOpenAI={(files) => {
          try {
            const urls = (files || []).map((f) => URL.createObjectURL(f));
            setAnalyzeImages((prev) => {
              prev.forEach((u) => { try { URL.revokeObjectURL(u); } catch {} });
              return urls;
            });
          } catch {}
          setOpenReg(false);
          setOpenAnalyze(true);
        }}
      />

      <AnalyzeModal
        open={openAnalyze}
        images={analyzeImages}
        onClose={() => setOpenAnalyze(false)}
        onReupload={() => {
          setOpenAnalyze(false);
          setOpenReg(true);
        }}
        onEdit={() => {
          // could route to manual register, for now just reopen register
          setOpenAnalyze(false);
          setOpenReg(true);
        }}
        onSubmit={() => {
          setOpenAnalyze(false);
          alert("등록 완료!");
        }}
      />

      <ConflictModal
        open={openCon}
        onClose={() => setOpenCon(false)}
        conflicts={[{ id: 1, time: "화 07:00", title: "일정 제목" }]}
      />

      <SearchModal
        open={openSearch}
        onClose={() => setOpenSearch(false)}
        onSelect={(item) => console.log("선택:", item)}
      />

      <ScheduleListModal
        open={openListCombined}
        onClose={() => setOpenListCombined(false)}
        itemsNoOriginal={demoItemsNoOriginal}
        itemsWithOriginal={demoItemsWithOriginal}
        onEdit={(it) => alert(`수정: ${it.title}`)}
        onViewOriginal={(it) => alert(`원본 이미지 확인: ${it.title}`)}
      />
    </S.Wrapper>
  );
}

export default ModalPlayground;


