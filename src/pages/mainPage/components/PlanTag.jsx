import * as S from "../styles/PlanTag.style";

const PlanTag = ({ size = "small", children, color }) => {
  return (
    <S.TagContainer $size={size} $color={color}>
      <S.TagText $size={size}>{children}</S.TagText>
    </S.TagContainer>
  );
};

export default PlanTag;
