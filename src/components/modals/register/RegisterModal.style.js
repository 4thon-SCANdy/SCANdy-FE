import styled from "styled-components";
import { vw } from "@/utils/units";

export const SearchInput = styled.input`
  width: 100%;
  height: ${vw(64)};
  padding: 0 ${vw(20)};
  border-radius: ${vw(32)};
  border: ${vw(2)} solid rgba(126, 141, 245, 0.45);
  font-size: ${vw(18)};
  color: #6a6a6a;
  margin-bottom: ${vw(24)};
`;

export const CardRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${vw(24)};
`;

export const Card = styled.div`
  min-height: ${vw(340)};
  border-radius: ${vw(24)};
  border: ${vw(2)} solid rgba(126, 141, 245, 0.45);
  background: linear-gradient(180deg, #f7f8ff 0%, #ffffff 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${vw(16)};
`;

export const CardTitle = styled.p`
  font-size: ${vw(22)};
  font-weight: 700;
  color: #7e8df5;
`;

export const CardAction = styled.button`
  height: ${vw(48)};
  padding: 0 ${vw(20)};
  border-radius: ${vw(24)};
  background: #7e8df5;
  color: #fff;
  font-weight: 600;
  font-size: ${vw(16)};
`;


