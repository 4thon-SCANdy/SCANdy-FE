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
  background: ${({ $upload }) => ($upload ? "linear-gradient(0deg, #FDFDFD 3.85%, #EAEDFF 100%)" : "transparent")};
  box-shadow: ${({ $upload }) => ($upload ? "0 0 20px 0 rgba(180, 191, 255, 0.30)" : "none")};
  border-radius: ${vw(32)};
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
`;

export const BottomRow = styled.div`
  margin-top: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${vw(36)};
`;

export const LargeButton = styled.button`
  display: inline-flex;
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
  flex: 0 0 auto;
  width: ${vw(220)};
  height: ${vw(38)};
  padding: 0 ${vw(28)};
  border-radius: ${vw(80)};
  border: ${vw(3)} solid #B4BFFF;
  background: #F4F6FF;
  color: #7E8DF5;
  text-align: center;
  font-family: Pretendard, sans-serif;
  font-style: normal;
  font-weight: 500;
  letter-spacing: -0.7px;
  justify-content: center;
`;

// 업로드 화면의 하단 버튼을 더 넓게
export const UploadButton = styled(LargeButton)`
  width: ${vw(420)};
  border: ${vw(3)} solid #B4BFFF;
  background: #F4F6FF;
  color: #7e8df5;
`;

// 업로드 단계 전용 스타일
export const UploadWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${vw(24)};
  width: 100%;
  min-height: ${vw(380)};
  justify-content: center;
  padding: 0;
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
  background: #ffffff;
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
  background: transparent;
  display: flex;
  flex-direction: column;
  gap: ${vw(26)};
`;

export const FormRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${vw(16)};
  flex-wrap: wrap;
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

export const DateRow = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

// 일정 시작/종료 날짜 입력 행
export const DateFieldGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${vw(20)};
  width: 100%;
  max-width: ${vw(960)};
  padding: 0 ${vw(12)};
`;

export const DateLabelBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 ${vw(4)};
  color: #4842b2;
  text-align: center;
  font-family: Pretendard, sans-serif;
  font-size: ${vw(32)};
  font-style: normal;
  font-weight: 500;
  line-height: 100%;
  letter-spacing: ${vw(-0.8)};
  white-space: nowrap;
`;

export const DateInputBox = styled.div`
  display: flex;
  width: ${vw(260)};
  height: ${vw(60)};
  padding: ${vw(12)} ${vw(26)} ${vw(14)} ${vw(26)};
  justify-content: center;
  align-items: flex-start;
  gap: ${vw(14)};
  flex-shrink: 0;
  border-radius: ${vw(50)};
  background: #b4bfff;
  box-shadow: inset 0 ${vw(4)} ${vw(16)} rgba(94, 129, 244, 0.25);
`;

export const DateInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background: transparent;
  color: #4842B2;
  font-weight: 800;
  font-size: ${vw(18)};
  text-align: center;
  letter-spacing: 0.02em;

  &::-webkit-calendar-picker-indicator {
    filter: brightness(0) invert(1);
    cursor: pointer;
  }

  &:disabled {
    color: rgba(255, 255, 255, 0.7);
    cursor: not-allowed;
  }
`;

export const TextInput = styled.div`
  width: 100%;
  min-height: ${vw(48)};
  border-radius: ${vw(60)};
  border: ${vw(2)} solid #b4bfff;
  display: flex;
  align-items: center;
  padding: ${vw(12)} ${vw(20)};
  color: #7e8df5;
  background: #ffffff;
  flex: 1;
  align-self: flex-start;
`;

export const InputEl = styled.input`
  width: 100%;
  min-height: ${vw(24)};
  border: none;
  outline: none;
  background: transparent;
  color: #7e8df5;
  font-weight: 800;
  font-size: ${vw(18)};
  line-height: 1.4;
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: ${vw(48)};
  max-height: ${vw(96)};
  border: none;
  outline: none;
  resize: none;
  background: transparent;
  color: #7e8df5;
  font-weight: 800;
  font-size: ${vw(18)};
  line-height: 1.4;
  overflow: hidden;
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
  justify-content: ${({ $single }) => ($single ? 'center' : 'center')};
  align-items: center;
  gap: ${vw(200)};
`;

export const RepeatWrap = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${vw(14)};
  align-items: stretch;
`;

export const ScheduleRow = styled(FormRow)`
  width: 100%;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${vw(0)};
  flex-wrap: nowrap;

  ${TextInput} {
    flex: 1 1 auto;
    max-width: 100%;
  }

  ${RepeatWrap} {
    flex: 0 0 ${vw(420)};
    display: flex;
    gap: ${vw(12)};
    justify-content: flex-end;
  }
`;

export const RepeatControlCard = styled.div`
  flex: 0 0 ${vw(200)};
  min-width: ${vw(190)};
  border-radius: ${vw(20)};

  background: transparent;
  padding: ${vw(12)} ${vw(16)};
  display: flex;
  flex-direction: column;
  gap: ${vw(6)};
  position: relative;
 
`;

export const RepeatControlHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${vw(1)};
`;

export const RepeatControlTitle = styled.div`
  display: flex;
  align-items: center;
  gap: ${vw(6)};
  color: #4842b2;
  font-size: ${vw(16)};
  font-weight: 700;
`;

export const RepeatControlIcon = styled.img`
  width: ${vw(16)};
  height: ${vw(16)};
`;

export const RepeatControlBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${vw(10)};
  padding-left: ${vw(2)};
  opacity: ${({ $disabled }) => ($disabled ? 0.45 : 1)};
  pointer-events: ${({ $disabled }) => ($disabled ? "none" : "auto")};
`;

export const RepeatChipRow = styled.div`
  display: flex;
  gap: ${vw(8)};
`;

export const MetaRow = styled(FormRow)`
  width: 100%;
  justify-content: space-between;
  align-items: stretch;
  gap: ${vw(32)};
`;

export const MetaColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${vw(12)};
  flex: 1 1 ${vw(280)};
`;

export const MetaField = styled.div`
  display: flex;
  align-items: center;
  gap: ${vw(12)};
`;

export const RepeatEndRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${vw(8)};
`;

export const RepeatEndLabel = styled.div`
  color: #6a6a6a;
  font-weight: 700;
  font-size: ${vw(13)};
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
  min-width: ${vw(58)};
  height: ${vw(36)};
  border-radius: ${vw(16)};
  border: ${vw(2)} solid #b4bfff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #7e8df5;
  font-weight: 800;
  padding: 0 ${vw(12)};
  box-sizing: border-box;
`;

// 시간 라벨 전용 칩: 두 라벨의 폭을 동일하게 유지
export const TimeChip = styled(SmallChip)`
  min-width: ${vw(140)};
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

// 모달 컨테이너의 overflow에 가려지지 않도록 띄우는 버전
export const TagMenuFloating = styled.div`
  position: fixed;
  width: ${vw(300)};
  border-radius: ${vw(20)};
  border: ${vw(2)} solid rgba(126, 141, 245, 0.35);
  background: #fff;
  box-shadow: 0 ${vw(10)} ${vw(30)} rgba(0,0,0,0.08);
  padding: ${vw(12)};
  z-index: 4000;
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
  width: ${vw(240)};
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

// 토글 아래에 작게 보이는 반복 설정 행
export const RepeatCompact = styled.div`
  display: flex;
  align-items: center;
  gap: ${vw(8)};
  margin-top: ${vw(6)};
  flex-wrap: nowrap;
  justify-content: flex-start;
`;

export const RepeatChipSm = styled(RepeatChip)`
  height: ${vw(26)};
  padding: 0 ${vw(12)};
  font-size: ${vw(12)};
  border-radius: ${vw(14)};
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
`;

export const MiniPill = styled(Pill)`
  height: ${vw(26)};
  min-width: unset;
  padding: 0 ${vw(12)};
  border-radius: ${vw(14)};
`;

export const MiniInputEl = styled(InputEl)`
  font-size: ${vw(12)};
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


