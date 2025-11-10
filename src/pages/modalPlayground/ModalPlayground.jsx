import { useState } from "react";
import * as S from "./ModalPlayground.style";
import { RegisterModal, ConflictModal, SearchModal, AnalyzeModal, ScheduleListModal, EditScheduleModal, OriginalImageModal } from "@/components/modals";

function ModalPlayground() {
  const [openReg, setOpenReg] = useState(false);
  const [openCon, setOpenCon] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [openAnalyze, setOpenAnalyze] = useState(false);
  const [analyzeImages, setAnalyzeImages] = useState([]); // object URLs
  const [openOriginal, setOpenOriginal] = useState(false);
  const [originalImages, setOriginalImages] = useState([]);
  const [openListCombined, setOpenListCombined] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [demoEdit, setDemoEdit] = useState({
    id: "edit-1",
    title: "일정 수정하기 예시",
    startDate: "2025-11-10",
    endDate: "2025-11-10",
    startTime: "09:00",
    endTime: "10:00",
    location: "회의실 B",
    tagId: "t1",
    repeatOn: false,
    allDay: false,
  });

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
        <S.Button
          onClick={() => {
            // 샘플 이미지로 원본 이미지 확인 모달 오픈
            setOriginalImages(["/assets/calendar/plus.svg", "/assets/main/logo.svg"]);
            setOpenOriginal(true);
          }}
        >
          원본 이미지 확인 모달
        </S.Button>
        <S.Button
          onClick={() => {
            setOpenEdit(true);
          }}
        >
          일정 수정 모달
        </S.Button>
      </S.ButtonRow>

      <RegisterModal
        open={openReg}
        editSchedule={editingSchedule}
        onClose={() => {
          setOpenReg(false);
          setEditingSchedule(null);
        }}
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
        onSaveEdit={(form) => {
          setOpenReg(false);
          setEditingSchedule(null);
          alert(`저장 완료: ${form?.title || ""}`);
        }}
        onDeleteEdit={(item) => {
          setOpenReg(false);
          alert(`삭제 요청: ${item?.title || ""}`);
          setEditingSchedule(null);
        }}
      />

      <EditScheduleModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        schedule={demoEdit}
        onSave={(updated) => {
          setDemoEdit(updated || demoEdit);
          setOpenEdit(false);
          alert(`저장 완료: ${updated?.title || ""}`);
        }}
        onDelete={(item) => {
          setOpenEdit(false);
          alert(`삭제 요청: ${item?.title || ""}`);
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
        onEdit={(it) => {
          setOpenListCombined(false);
          setEditingSchedule({
            ...it,
            startDate: "2025-11-09",
            endDate: "2025-11-09",
          });
          setOpenReg(true);
        }}
        onViewOriginal={(it) => {
          // 데모: 분석용 이미지가 있으면 재사용, 없으면 샘플 이미지
          const imgs = (analyzeImages && analyzeImages.length > 0)
            ? analyzeImages
            : ["/assets/calendar/plus.svg", "/assets/main/logo.svg"];
          setOriginalImages(imgs);
          setOpenOriginal(true);
        }}
      />

      <OriginalImageModal
        open={openOriginal}
        images={originalImages}
        onClose={() => setOpenOriginal(false)}
        onConfirm={() => setOpenOriginal(false)}
      />
    </S.Wrapper>
  );
}

export default ModalPlayground;


