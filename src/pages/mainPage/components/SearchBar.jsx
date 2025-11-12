import * as S from "../styles/SearchBar.style";

import SEARCH from "@/assets/main/search.svg";
import SEARCHING from "@/assets/main/searching.svg";

const SearchBar = ({ onFocus }) => {
  return (
    <>
      <S.SearchBarContainer onClick={onFocus}>
        <S.Input type="text" placeholder="일정을 검색해 주세요!" />
        <S.Icon src={SEARCH} data-active={SEARCHING} />
      </S.SearchBarContainer>
    </>
  );
};

export default SearchBar;
