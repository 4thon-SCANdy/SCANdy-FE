import styled from "styled-components";
import { vw } from "@/utils/units";

export const Empty = styled.div`
  height: ${vw(240)};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #7e8df5;
  font-weight: 600;
`;


// 추가: RegisterModal과 동일한 헤더/레이아웃 요소
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 4.125vw; /* 디자인 시안 기준 간격 */
  flex: 1; /* 버튼을 하단으로 밀기 위해 남은 영역 채움 */
`;

export const Padding = styled.div`
  padding: 3.24vw 2.458vw;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const TopLabel = styled.div`
  width: ${vw(640)};
  height: ${vw(56)};
  margin: 0 auto;
  border-radius: ${vw(32)};
  border: ${vw(2)} solid rgba(126, 141, 245, 0.6);
  background: linear-gradient(180deg, #f7f8ff 0%, #ffffff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #7e8df5;
  font-weight: 800;
  font-size: ${vw(20)};
`;

export const CloseFloating = styled.button`
  position: absolute;
  top: ${vw(14)};
  right: ${vw(18)};
  width: ${vw(56)};
  height: ${vw(56)};
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: ${vw(34)};
  color: #7e8df5;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 5;
  &:hover { background: rgba(126, 141, 245, 0.1); }
`;

// 중앙 콘텐츠
export const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${vw(20)};
`;

export const Icon = styled.img`
  width: ${vw(120)};
  height: auto;
`;

export const MessageWrap = styled.div`
  text-align: center;
  color: #666;
`;

export const MainText = styled.div`
  font-size: ${vw(22)};
  font-weight: 700;
  color: #4842b2;
`;

export const SubText = styled.div`
  margin-top: ${vw(6)};
  font-size: ${vw(18)};
`;

export const ButtonRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${vw(36)};
  margin-top: auto; /* 버튼을 컨테이너 하단으로 정렬 */
`;

export const LargeButton = styled.button`
  height: ${vw(56)};
  border-radius: ${({ $muted }) => ($muted ? "80px" : vw(32))};
  border: ${({ $muted }) => ($muted ? "3px solid #BDBDBD" : `${vw(2)} solid #7e8df5`)};
  background: #ffffff;
  color: ${({ $muted }) => ($muted ? "#BDBDBD" : "#7e8df5")};
  font-weight: 800;
  font-size: ${vw(20)};
  display: flex;
  align-items: center;
  justify-content: center;
  /* muted: 시각적으로 비활성처럼 보이게 하되 hover 가능 */
  opacity: ${({ $muted }) => ($muted ? 0.4 : 1)};
  cursor: pointer;
  transition: background 0.2s ease, box-shadow 0.2s ease, transform 0.06s ease;
  &:hover {
    ${({ $muted }) =>
      $muted
        ? `background: #E5E5E5; box-shadow: none;`
        : `background: rgba(126, 141, 245, 0.08); box-shadow: 0 ${vw(6)} ${vw(20)} rgba(126, 141, 245, 0.12);`}
  }
  &:active {
    transform: translateY(${vw(1)});
  }
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 ${vw(3)} rgba(126, 141, 245, 0.35);
  }
`;


