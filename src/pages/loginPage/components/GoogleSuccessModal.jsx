import { useState } from "react";
import * as S from "../styles/GoogleSuccessModal.style";
import LoginModal from "./LoginModal";

import CLOSE from "@/assets/login/close.svg";

const GoogleSuccessModal = ({ type = "success", email = "", onClose }) => {
  const isSuccess = type === "success";

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
                <S.MailText $isSuccess={isSuccess}>
                  {isSuccess ? email : "계정 알 수 없음"}
                </S.MailText>
              </S.MailBox>
              <S.OkBox onClick={onClose}>
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
