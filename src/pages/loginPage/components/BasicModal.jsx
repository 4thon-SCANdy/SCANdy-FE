import * as S from "../styles/BasicModal.style";
import LoginModal from "./LoginModal";

import ANDY from "@/assets/main/andy.svg";

const BasicModal = () => {
  return (
    <LoginModal>
      <S.BasicContainer>
        <S.Header>
          <S.Icon src={ANDY} />
          <S.HeaderText>
            <span>※</span> 가입 없이 사용하시면 <br /> 14일 이상 된 일정들은
            자동으로 삭제됩니다.
          </S.HeaderText>
        </S.Header>
        <S.ButtonWrapper>
          <S.GoogleBtn>
            <S.BtnText>구글 연동하기</S.BtnText>
          </S.GoogleBtn>
          <S.ContiBtn>
            <S.BtnText>가입 없이 진행하기</S.BtnText>
          </S.ContiBtn>
        </S.ButtonWrapper>
      </S.BasicContainer>
    </LoginModal>
  );
};

export default BasicModal;
