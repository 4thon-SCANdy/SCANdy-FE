import * as S from "../styles/BasicModal.style";
import LoginModal from "./LoginModal";

import ANDY from "@/assets/main/andy.svg";
import STAR from "@/assets/login/star.svg";
import gusetRegisterApi from "../../../apis/auth/guestRegisterApi";

const BasicModal = () => {
  const handleGuestContinue = async () => {
    try {
      const res = await gusetRegisterApi();
      console.log(res.message);
      window.location.href = "/";
    } catch (error) {
      console.error("게스트 이용 실패:", error);
    }
  };

  return (
    <LoginModal>
      <S.BasicContainer>
        <S.Header>
          <S.Icon src={ANDY} />
          <S.HeaderTextWrapper>
            <S.HeaderIcon src={STAR} />
            <S.HeaderText>
              가입 없이 사용하시면 <br /> 14일 이상 된 일정들은 자동으로
              삭제됩니다.
            </S.HeaderText>
          </S.HeaderTextWrapper>
        </S.Header>
        <S.ButtonWrapper>
          <S.GoogleBtn>
            <S.BtnText>구글 연동하기</S.BtnText>
          </S.GoogleBtn>
          <S.ContiBtn onClick={handleGuestContinue}>
            <S.BtnText>가입 없이 진행하기</S.BtnText>
          </S.ContiBtn>
        </S.ButtonWrapper>
      </S.BasicContainer>
    </LoginModal>
  );
};

export default BasicModal;
