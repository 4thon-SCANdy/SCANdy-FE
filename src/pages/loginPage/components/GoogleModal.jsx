import * as S from "../styles/GoogleModal.style";
import LoginModal from "./LoginModal";

import STAR from "@/assets/login/star.svg";
import GOOGLE from "@/assets/main/google.svg";

const GoogleModal = ({ onClose }) => {
  return (
    <>
      <LoginModal>
        <S.GoogleContainer>
          <S.CloseBtn src={CLOSE} onClick={onClose} />
          <S.GoogleContent>
            <S.LoginTitle>
              <S.TitleText>구글 연동하기</S.TitleText>
            </S.LoginTitle>
            <S.LoginContent>
              <S.LoginSub>
                <S.SubIcon src={STAR} />
                <S.SubText>
                  구글 연동하기는 구글 계정으로 로그인하셔야 사용 가능합니다.
                </S.SubText>
              </S.LoginSub>
              <S.LoginBtn>
                <S.Google src={GOOGLE} />
                <S.GoogleText>구글로 시작하기</S.GoogleText>
              </S.LoginBtn>
            </S.LoginContent>
          </S.GoogleContent>
        </S.GoogleContainer>
      </LoginModal>
    </>
  );
};

export default GoogleModal;
