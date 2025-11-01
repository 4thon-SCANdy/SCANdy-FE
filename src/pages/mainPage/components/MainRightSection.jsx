import * as S from "../styles/MainRightSection.style";

import GOOGLE from "@/assets/main/google.svg";

const MainRightSection = () => {
  return (
    <S.RightSectionContainer>
      <S.GoogleBox>
        <S.GoogleImg src={GOOGLE} />
        <S.GoogleText>구글 연동</S.GoogleText>
      </S.GoogleBox>
    </S.RightSectionContainer>
  );
};

export default MainRightSection;
