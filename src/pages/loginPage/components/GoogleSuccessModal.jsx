import { useState } from "react";
import * as S from "../styles/GoogleSuccessModal.style";
import LoginModal from "./LoginModal";

import CLOSE from "@/assets/login/close.svg";

const GoogleSuccessModal = ({ type = "success", onClose }) => {
  const isSuccess = type === "success";

  const [isAccount, setIsAccount] = useState(["구글 구글 1234@gmail.com"]);

  return (
    <>
      <LoginModal>
        <S.SuccessContainer>
          <S.CloseBtn src={CLOSE} onClick={onClose} />
          <S.ModalContent>
            <S.SuccessBox $isSuccess={isSuccess}>
              <S.SuccessText $isSuccess={isSuccess}>
                {isSuccess ? "구글 연동 성공!" : "구글 연동 실패"}
              </S.SuccessText>
            </S.SuccessBox>

            <S.CheckBox>
              <S.MailBox $isSuccess={isSuccess}>
                <S.MailText $isSuccess={isSuccess}>{isAccount}</S.MailText>
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
