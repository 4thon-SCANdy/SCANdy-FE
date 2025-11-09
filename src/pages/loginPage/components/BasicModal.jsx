import * as S from "../styles/BasicModal.style";
import LoginModal from "./LoginModal";

import ANDY from "@/assets/main/andy.svg";
import STAR from "@/assets/login/star.svg";
import guestRegisterApi from "../../../apis/auth/guestRegisterApi";
import guestLoginApi from "../../../apis/auth/guestLoginApi";

const BasicModal = () => {
  const handleGuestContinue = async () => {
    try {
      // 로그인 먼저 시도
      const loginRes = await guestLoginApi();
      console.log("게스트 로그인 성공: ", loginRes.message);

      sessionStorage.setItem("access_token", loginRes.token);
      window.location.href = "/";
    } catch (error) {
      // 로그인 실패 시 회원가입 후 다시 로그인
      console.warn("로그인 실패로 회원가입 진행");
      await guestRegisterApi();
      console.log("게스트 회원가입 완료");

      const loginRes = await guestLoginApi();
      console.log("게스트 로그인 성공: ", loginRes.message);

      sessionStorage.setItem("access_token", loginRes.token);
      window.location.href = "/";
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
