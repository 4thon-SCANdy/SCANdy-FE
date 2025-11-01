import styled from "styled-components";
import { vw } from "@/utils/units";

export const SearchBarContainer = styled.div`
  display: flex;
  width: ${vw(616)};
  height: ${vw(54)};
  padding: ${vw(8)} ${vw(8)} ${vw(8)} ${vw(20)};
  justify-content: space-between;
  align-items: center;
  gap: ${vw(1)};
  flex-shrink: 0;
  border-radius: ${vw(50)};
  border: ${vw(1)} solid #e5e5e5;
  background: #fdfdfd;
  box-shadow: ${vw(4)} ${vw(4)} ${vw(10)} 0 rgba(229, 229, 229, 0.2);

  &:hover {
    box-shadow: 4px 4px 10px 0 #eaedff;
  }

  &:click,
  :focus-within {
    border: 1px solid #b4bfff;
    box-shadow: 4px 4px 10px 0 #eaedff;

    img {
      content: attr(data-active);
    }
  }
`;

export const Icon = styled.img`
  width: ${vw(38)};
  height: ${vw(38)};
  flex-shrink: 0;
`;

export const Input = styled.input`
  color: #606060;
  font-family: Pretendard;
  font-size: ${vw(20)};
  font-style: normal;
  font-weight: 400;
  line-height: 100%; /* 20px */
  letter-spacing: -0.5px;

  &::placeholder {
    color: #bdbdbd;
  }
`;
