import * as S from "../styles/GoogleSuccessModal.style";
import LoginModal from "./LoginModal";

import CLOSE from "@/assets/login/close.svg";

const GoogleSuccessModal = ({ onClose }) => {
  return (
    <>
      <LoginModal>
        <S.SuccessContainer>
          <S.CloseBtn src={CLOSE} onClick={onClose} />
          <S.ModalContent>
            <S.SuccessBox>
              <S.SuccessText>구글 연동 성공!</S.SuccessText>
            </S.SuccessBox>
            <S.CheckBox>
              <S.MailBox>
                <S.MailText>구글 구글 1234@gmail.com</S.MailText>
              </S.MailBox>
              <S.OkBox>
                <S.OkText>확인</S.OkText>
              </S.OkBox>
            </S.CheckBox>
          </S.ModalContent>
        </S.SuccessContainer>
      </LoginModal>
    </>
  );
};

export default GoogleSuccessModal;
