import * as S from "../styles/LoginModal.style";

const LoginModal = ({ children }) => {
  return (
    <S.ModalOverlay>
      <S.LoginModalContainer>{children}</S.LoginModalContainer>
    </S.ModalOverlay>
  );
};

export default LoginModal;
