import * as S from "../styles/MainRightSection.style";

import PLAN from "@/assets/main/todayPlan.svg";

const MainRightSection = () => {
  return (
    <S.RightSectionContainer>
      <S.PlanImg src={PLAN} />
    </S.RightSectionContainer>
  );
};

export default MainRightSection;
