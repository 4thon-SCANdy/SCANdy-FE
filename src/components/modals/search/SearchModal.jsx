import React, { useState } from "react";
import ModalBase from "../ModalBase";
import * as S from "./SearchModal.style";

function SearchModal({ open, onClose, onSelect, initialKeyword = "" }) {
  const [keyword, setKeyword] = useState(initialKeyword);
  const [results, setResults] = useState([]);

  const onSearch = () => {
    const sample = [
      { id: 1, title: "팀 미팅", dateText: "2025-11-03", timeText: "10:00" },
      { id: 2, title: "디자인 리뷰", dateText: "2025-11-03", timeText: "14:00" },
    ];
    setResults(sample.filter((s) => s.title.includes(keyword)));
  };

  return (
    <ModalBase open={open} onClose={onClose} title="일정 검색" widthPx={960} heightPx={600}
      footer={<S.SearchButton onClick={onSearch}>검색</S.SearchButton>}
    >
      <S.SearchRow>
        <S.Input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="검색어를 입력하세요" />
      </S.SearchRow>
      <S.ResultList>
        {results.map((r) => (
          <S.ResultItem key={r.id} onClick={() => onSelect?.(r)}>
            <S.ResultTitle>{r.title}</S.ResultTitle>
            <S.ResultMeta>{r.dateText} · {r.timeText}</S.ResultMeta>
          </S.ResultItem>
        ))}
      </S.ResultList>
    </ModalBase>
  );
}

export default SearchModal;


