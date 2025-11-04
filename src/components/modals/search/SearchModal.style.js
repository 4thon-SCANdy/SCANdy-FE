import styled from "styled-components";
import { vw } from "@/utils/units";

export const SearchRow = styled.div`
  display: flex;
  gap: ${vw(12)};
  margin-bottom: ${vw(16)};
`;

export const Input = styled.input`
  flex: 1;
  height: ${vw(48)};
  padding: 0 ${vw(16)};
  border-radius: ${vw(12)};
  border: ${vw(1)} solid rgba(126, 141, 245, 0.45);
`;

export const SearchButton = styled.button`
  height: ${vw(40)};
  padding: 0 ${vw(16)};
  border-radius: ${vw(20)};
  background: #7e8df5;
  color: #fff;
  font-weight: 600;
`;

export const ResultList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${vw(8)};
`;

export const ResultItem = styled.button`
  text-align: left;
  padding: ${vw(12)} ${vw(16)};
  border-radius: ${vw(12)};
  border: ${vw(1)} solid rgba(126, 141, 245, 0.35);
  background: #fff;
`;

export const ResultTitle = styled.div`
  font-weight: 700;
  color: #4842b2;
`;

export const ResultMeta = styled.div`
  color: #6a6a6a;
  font-size: ${vw(14)};
`;


