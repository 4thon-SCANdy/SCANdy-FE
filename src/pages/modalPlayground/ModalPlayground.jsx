import { useState } from "react";
import * as S from "./ModalPlayground.style";
import { RegisterModal, ConflictModal, SearchModal } from "@/components/modals";

function ModalPlayground() {
  const [openReg, setOpenReg] = useState(false);
  const [openCon, setOpenCon] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  return (
    <S.Wrapper>
      <S.Title>Modal Playground</S.Title>
      <S.ButtonRow>
        <S.Button onClick={() => setOpenReg(true)}>일정 등록 모달</S.Button>
        <S.Button onClick={() => setOpenCon(true)}>일정 충돌 모달</S.Button>
        <S.Button onClick={() => setOpenSearch(true)}>일정 검색 모달</S.Button>
      </S.ButtonRow>

      <RegisterModal open={openReg} onClose={() => setOpenReg(false)} />

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
    </S.Wrapper>
  );
}

export default ModalPlayground;


