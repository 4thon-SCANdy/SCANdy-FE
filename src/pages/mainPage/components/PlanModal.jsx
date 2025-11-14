import * as S from "../styles/PlanModal.style";
import ANDY from "@/assets/main/andy.svg";

const PlanModal = () => {
  return (
    <S.ModalOverlay>
      <S.PlanModalContainer>
        <S.ModalImg src={ANDY} />
        <S.XText>검색하신 일정이 없습니다!</S.XText>
      </S.PlanModalContainer>
    </S.ModalOverlay>
  );
};

export default PlanModal;
