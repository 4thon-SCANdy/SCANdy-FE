import { useState } from "react";
import * as S from "./ColorChip.style";

const ColorChip = () => {
  const [colors] = useState([
    "#2BE99A",
    "#50B0FF",
    "#525252",
    "#986DFF",
    "#A0D4FF",
    "#A6FBD7",
    "#AEAEAE",
    "#D9C9FF",
    "#E8E8E8",
    "#F6553C",
    "#FE72C1",
    "#FFA091",
    "#FFC9E8",
    "#FFD258",
    "#FFEBB5",
  ]);

  return (
    <>
      <S.ColorChipContainer>
        {colors.map((color, index) => (
          <S.Color key={index} $color={color} />
        ))}
      </S.ColorChipContainer>
    </>
  );
};

export default ColorChip;
