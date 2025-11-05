import * as S from "./LoginPage.style";

import LOGO from "@/assets/main/logo.svg";
import GOOGLE from "@/assets/main/google.svg";

const LoginPage = () => {
  return (
    <>
      <S.LoginContainer>
        <S.ScrollCalendar></S.ScrollCalendar>
        <S.LoginRight>
          <S.Logo src={LOGO} />
          <S.LoginBtn>
            <S.GoogleBtn>
              <S.GoogleImg src={GOOGLE} />
              <p>구글로 시작하기</p>
            </S.GoogleBtn>
            <S.BasicBtn>
              <p>가입 없이 사용하기</p>
            </S.BasicBtn>
          </S.LoginBtn>
        </S.LoginRight>
      </S.LoginContainer>
    </>
  );
};

export default LoginPage;
