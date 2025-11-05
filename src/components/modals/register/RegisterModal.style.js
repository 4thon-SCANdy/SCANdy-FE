import styled from "styled-components";
import { vw } from "@/utils/units";

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 2.8vw;
`;

// 모달 본문 커스텀 패딩 (상하 3.24vw, 좌우 2.458vw)
export const Padding = styled.div`
  padding: 2.6vw 2.2vw;
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

export const CardRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${vw(24)};
`;

export const Card = styled.div`
  aspect-ratio: 16 / 9;
  border-radius: ${vw(24)};
  border: ${vw(2)} solid rgba(126, 141, 245, 0.45);
  background: transparent;
  overflow: hidden;
`;

export const Preview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  /* SVG 내부의 외곽 프레임/글로우를 잘라내기 위한 클리핑 */
  clip-path: inset(${vw(12)} ${vw(12)} ${vw(12)} ${vw(12)} round ${vw(16)});
`;

export const BottomRow = styled.div`
  margin-top: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${vw(36)};
`;

export const LargeButton = styled.button`
  height: ${vw(52)}; 
  border-radius: ${vw(32)}; 
  border: ${vw(2)} solid #7e8df5;
  background: #ffffff;
  color: #7e8df5;
  font-weight: 800;
  font-size: ${vw(19)}; 
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s ease, box-shadow 0.2s ease, transform 0.06s ease;
  &:hover {
    background: rgba(126, 141, 245, 0.08);
    box-shadow: 0 ${vw(6)} ${vw(20)} rgba(126, 141, 245, 0.12);
  }
  &:active {
    transform: translateY(${vw(1)});
  }
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 ${vw(3)} rgba(126, 141, 245, 0.35);
  }
`;

// 직접 등록 하단 버튼을 조금 더 넓게
export const WideButton = styled(LargeButton)`
  min-width: ${vw(280)};
  height: ${vw(46)};
`;

// 업로드 화면의 하단 버튼을 더 넓게
export const UploadButton = styled(LargeButton)`
  width: ${vw(420)};
`;

// 업로드 단계 전용 스타일
export const UploadWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${vw(36)};
  /* 버튼 위치가 변하지 않도록 업로드 영역의 최소 높이를 고정 */
  min-height: ${vw(460)};
  justify-content: flex-start;
`;

// 업로드 콘텐츠 뷰포트(빈 상태/선택 상태 모두 같은 높이 유지)
/* UploadViewport (reverted) 제거 */

export const UploadBox = styled.div`
  width: 92%;
  height: ${vw(320)};
  border-radius: ${vw(24)};
  border: ${vw(2)} solid rgba(126, 141, 245, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;

export const UploadInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${vw(16)};
  color: #7e8df5;
  font-weight: 800;
  font-size: ${vw(28)};
`;

// 간단한 이미지 슬라이더
export const Carousel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${vw(24)};
  width: 100%;
`;

export const SideSlide = styled.div`
  width: ${vw(220)};
  height: ${vw(240)};
  border: ${vw(2)} solid rgba(126, 141, 245, 0.45);
  border-radius: ${vw(16)};
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
  overflow: hidden;
  cursor: pointer;
  img { width: 100%; height: 100%; object-fit: contain; }
`;

export const MainSlide = styled.div`
  width: ${vw(520)};
  height: ${vw(300)};
  border: ${vw(2)} solid #7e8df5;
  border-radius: ${vw(16)};
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  overflow: hidden;
  img { width: 100%; height: 100%; object-fit: contain; }
`;

export const Dots = styled.div`
  display: flex;
  gap: ${vw(8)};
  align-items: center;
  justify-content: center;
`;

export const Dot = styled.span`
  width: ${vw(10)};
  height: ${vw(10)};
  border-radius: 50%;
  border: ${vw(2)} solid #c7cffd;
  background: ${({ $active }) => ($active ? '#7e8df5' : '#eef2ff')};
`;

// 직접 일정 등록 폼 모양(정적 UI)
export const FormWrap = styled.div`
  width: 100%;
  height: auto;
  border-radius: ${vw(24)};
  border: ${vw(2)} solid rgba(126, 141, 245, 0.45);
  background: linear-gradient(180deg, #f7f8ff 0%, #ffffff 100%);
  padding: ${vw(20)};
  display: flex;
  flex-direction: column;
  gap: ${vw(26)};
`;

export const FormRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${vw(16)};
`;

export const Label = styled.div`
  color: #6a6a6a;
  font-weight: 800;
  white-space: nowrap;
  margin: 0 ${vw(8)} 0 0;
`;

export const Pill = styled.div`
  min-width: ${vw(220)};
  height: ${vw(48)};
  border-radius: ${vw(24)};
  border: ${vw(2)} solid #b4bfff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #7e8df5;
  background: #fff;
  font-weight: 800;
  padding: 0 ${vw(12)};
`;

export const TextInput = styled.div`
  width: 100%;
  height: ${vw(48)};
  border-radius: ${vw(24)};
  border: ${vw(2)} solid #b4bfff;
  display: flex;
  align-items: center;
  padding: 0 ${vw(16)};
  color: #7e8df5;
`;

export const InputEl = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background: transparent;
  color: #7e8df5;
  font-weight: 800;
  font-size: ${vw(18)};
`;

export const SelectEl = styled.select`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background: transparent;
  color: #7e8df5;
  font-weight: 800;
  font-size: ${vw(16)};
`;

export const ActionsRow = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  gap: ${vw(24)};
`;

// 반복 설정 토글
export const RepeatWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${vw(6)};
  align-items: flex-start;
`;

// 반복 상세 영역(아래로만 펼쳐짐)
export const RepeatArea = styled.div`
  overflow: hidden;
  max-height: ${({ $open }) => ($open ? vw(240) : 0)};
  transition: max-height 0.25s ease, margin-top 0.25s ease, padding 0.25s ease;
  margin-top: ${({ $open }) => ($open ? vw(8) : 0)};
  padding: ${({ $open }) => ($open ? `${vw(4)} 0` : 0)};
`;

export const RepeatLabel = styled.div`
  color: #6a6a6a;
  font-weight: 800;
  white-space: nowrap;
`;

export const Toggle = styled.button`
  width: ${vw(50)};
  height: ${vw(24)};
  border-radius: ${vw(24)};
  background: ${({ $on }) => ($on ? '#7e8df5' : '#d6dbff')};
  position: relative;
  border: none;
`;

export const ToggleKnob = styled.span`
  position: absolute;
  top: ${vw(3)};
  left: ${({ $on }) => ($on ? vw(35) : vw(3))};
  width: ${vw(18)};
  height: ${vw(18)};
  background: #fff;
  border-radius: 50%;
`;

export const MutedText = styled.div`
  color: #9aa1d9;
  font-size: ${vw(14)};
`;

// 태그/장소 행
export const SmallChip = styled.div`
  width: ${vw(58)};
  height: ${vw(30)};
  border-radius: ${vw(16)};
  border: ${vw(2)} solid #b4bfff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #7e8df5;
  font-weight: 800;
`;

export const SmallInput = styled.div`
  width: ${vw(240)};
  height: ${vw(36)};
  border-radius: ${vw(16)};
  border: ${vw(2)} solid #e0e5ff;
  color: #7e8df5;
  display: flex;
  align-items: center;
  padding: 0 ${vw(12)};
`;

// 태그 셀렉터
export const TagSelect = styled.div`
  position: relative;
  width: ${vw(240)};
`;

export const TagButton = styled.button`
  width: 100%;
  height: ${vw(36)};
  border-radius: ${vw(16)};
  border: ${vw(2)} solid #e0e5ff;
  background: #fff;
  color: #7e8df5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${vw(12)};
  font-weight: 800;
`;

export const Caret = styled.span`
  width: ${vw(8)};
  height: ${vw(8)};
  border-right: ${vw(2)} solid #7e8df5;
  border-bottom: ${vw(2)} solid #7e8df5;
  transform: rotate(45deg);
`;

export const TagMenu = styled.div`
  position: absolute;
  top: calc(100% + ${vw(8)});
  left: 0;
  width: ${vw(300)};
  border-radius: ${vw(20)};
  border: ${vw(2)} solid rgba(126, 141, 245, 0.35);
  background: #fff;
  box-shadow: 0 ${vw(10)} ${vw(30)} rgba(0,0,0,0.08);
  padding: ${vw(12)};
  z-index: 10;
`;

export const TagMenuHeader = styled.div`
  color: #b2b8e9;
  font-weight: 800;
  margin-bottom: ${vw(8)};
`;

export const TagRow = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${vw(10)} ${vw(8)};
  border-radius: ${vw(12)};
  &:hover { background: #f7f8ff; }
`;

export const TagRowLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${vw(12)};
  color: #6a6a6a;
  font-weight: 800;
`;

export const Swatch = styled.span`
  width: ${vw(28)};
  height: ${vw(28)};
  border-radius: ${vw(8)};
  background: ${({ $color }) => $color};
`;

export const Radio = styled.span`
  width: ${vw(18)};
  height: ${vw(18)};
  border-radius: 50%;
  border: ${vw(2)} solid #c7cffd;
  background: ${({ $active }) => ($active ? '#7e8df5' : 'transparent')};
`;

export const TagAddRow = styled(TagRow)`
  ${Swatch} { background: #f4f6ff; border: ${vw(2)} solid #e3e8ff; }
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  pointer-events: ${({ $disabled }) => ($disabled ? 'none' : 'auto')};
`;

// 색상 팔레트
export const Palette = styled.div`
  margin-top: ${vw(10)};
  display: grid;
  grid-template-columns: repeat(8, ${vw(22)});
  gap: ${vw(10)};
  padding: ${vw(8)};
  background: #fff;
  border-radius: ${vw(12)};
`;

export const ColorDot = styled.button`
  width: ${vw(22)};
  height: ${vw(22)};
  border-radius: 50%;
  background: ${({ $color }) => $color};
  border: ${vw(2)} solid #ffffff;
  box-shadow: 0 0 0 ${vw(2)} rgba(126,141,245,0.25);
  ${({ $active }) => $active && `box-shadow: 0 0 0 ${vw(2)} rgba(126,141,245,0.9);`}
`;

// 시간 입력 영역(정적 UI)
export const TimeWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${vw(20)};
  align-items: center;
  width: 100%;
`;

export const TimeCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${vw(10)};
`;

export const MeridiemCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${vw(10)};
  color: #7e8df5;
  font-weight: 800;
`;

export const TimeBig = styled.div`
  font-size: ${vw(56)};
  color: rgba(126, 141, 245, 0.35);
  font-weight: 800;
`;

export const TimeEl = styled.input`
  width: ${vw(200)};
  max-width: 100%;
  height: ${vw(48)};
  border-radius: ${vw(24)};
  border: ${vw(2)} solid #b4bfff;
  background: #fff;
  color: #7e8df5;
  font-weight: 800;
  text-align: center;
  box-sizing: border-box;
`;

export const OptionGroup = styled.div`
  display: flex;
  gap: ${vw(12)};
  margin-top: ${vw(8)};
`;

export const OptionBtn = styled.button`
  padding: 0 ${vw(16)};
  height: ${vw(32)};
  border-radius: ${vw(16)};
  border: ${vw(2)} solid #b4bfff;
  background: ${({ $active }) => ($active ? '#eef2ff' : '#fff')};
  color: #7e8df5;
  font-weight: 800;
`;

// 반복 설정 on 상태의 카드 레이아웃
export const RepeatPanel = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;
  gap: ${vw(20)};
  margin-top: ${vw(8)};
  width: 100%;
  max-width: calc(100% - ${vw(16)});
  box-sizing: border-box;
  padding-right: ${vw(40)};
  overflow: hidden;
`;

export const RepeatCard = styled.div`
  padding: 0;
  border: none;
  background: transparent;
  display: contents; /* allow chip to control sizing */
`;

export const RepeatChip = styled.button`
  padding: 0 ${vw(16)};
  height: ${vw(32)};
  border-radius: ${vw(18)};
  border: ${vw(2)} solid ${({ $active }) => ($active ? '#7e8df5' : '#b4bfff')};
  background: ${({ $active }) => ($active ? '#eef2ff' : '#ffffff')};
  color: ${({ $active }) => ($active ? '#5e81f4' : '#7e8df5')};
  font-weight: 800;
  font-size: ${vw(14)};
  white-space: nowrap;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
  &:hover { box-shadow: 0 ${vw(2)} ${vw(8)} rgba(126,141,245,0.18); }
  &:focus-visible { outline: none; box-shadow: 0 0 0 ${vw(3)} rgba(126,141,245,0.35); }
`;

export const InlineRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${vw(1)};
  flex-wrap: nowrap;
`;

export const TagNameRow = styled(InlineRow)`
  margin-top: ${vw(10)};
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


