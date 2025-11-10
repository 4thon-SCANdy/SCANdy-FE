import React, { useEffect, useMemo, useState } from "react";
import ModalBase from "../ModalBase";
import * as S from "./ScheduleListModal.style";
import shareIcon from "@/assets/modal/share.svg";
import LINE from "@/assets/Calendar/line.svg";

const days = [
  "일요일",
  "월요일",
  "화요일",
  "수요일",
  "목요일",
  "금요일",
  "토요일",
];

/**
 * ScheduleListModal
 * props:
 * - open: boolean
 * - onClose: () => void
 * - items: Array<{ id: string|number, ampm?: "AM"|"PM", time?: string, title?: string, tagLabel?: string }>  // (deprecated single list)
 *          또는 Array<{ ..., hasOriginal?: boolean }> 로 각 항목별 원본 버튼 표시 여부 제어
 * - itemsWithOriginal?: same as items   // '원본 이미지 확인' 버튼이 있는 리스트
 * - itemsNoOriginal?: same as items     // 버튼이 없는 리스트
 * - onEdit: (item) => void
 * - onViewOriginal: (item) => void
 * - onShare?: (selectedItems: Array<item>) => void
 * - showOriginalButton: boolean  // (deprecated) 각 일정행 우측에 '원본 이미지 확인' 버튼 표시 여부
 * - title?: string                // 상단 중앙 타이틀
 */
function ScheduleListModal({
  open,
  onClose,
  items = [],
  itemsWithOriginal,
  itemsNoOriginal,
  onEdit,
  onViewOriginal,
  onShare,
  showOriginalButton = false,
  title = "일정 확인",
}) {
  if (!open) return null;

  const [shareMode, setShareMode] = useState(false);
  const [shareSelection, setShareSelection] = useState([]);

  useEffect(() => {
    if (!open) {
      setShareMode(false);
      setShareSelection([]);
    }
  }, [open]);

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const day = days[today.getDay()];

  // 호환성: 단일 items가 주어지면 각 아이템의 hasOriginal로 판단
  // itemsWithOriginal / itemsNoOriginal 가 주어지면 두 배열을 합쳐 한 리스트로 렌더
  const allItems = useMemo(() => {
    if (
      (itemsWithOriginal && itemsWithOriginal.length) ||
      (itemsNoOriginal && itemsNoOriginal.length)
    ) {
      const withOriginal = (itemsWithOriginal || []).map((it) => ({
        ...it,
        hasOriginal: true,
      }));
      const withoutOriginal = (itemsNoOriginal || []).map((it) => ({
        ...it,
        hasOriginal: false,
      }));
      return [...withOriginal, ...withoutOriginal];
    }

    if (items && items.length) {
      return items.map((it) => ({
        ...it,
        hasOriginal:
          typeof it.hasOriginal === "boolean" ? it.hasOriginal : !!showOriginalButton,
      }));
    }

    return [];
  }, [items, itemsNoOriginal, itemsWithOriginal, showOriginalButton]);

  useEffect(() => {
    setShareSelection((prev) =>
      prev.filter((id) => allItems.some((item) => item.id === id)),
    );
  }, [allItems]);

  const toggleShareSelection = (targetId) => {
    setShareSelection((prev) =>
      prev.includes(targetId)
        ? prev.filter((id) => id !== targetId)
        : [...prev, targetId],
    );
  };

  const handleShareClick = () => {
    if (shareMode) {
      if (onShare) {
        const selectedItems = allItems.filter((item) =>
          shareSelection.includes(item.id),
        );
        onShare(selectedItems);
      }
      setShareMode(false);
      setShareSelection([]);
    } else {
      setShareMode(true);
    }
  };

  const renderList = (arr = []) => (
    <S.ListWrap>
      {(arr || []).map((item) => (
        <S.Row key={item.id} $shareMode={shareMode}>
          <S.TimeCol>
            <S.AmPmGroup>
              {["AM", "PM"].map((label) => (
                <S.AmPmButton key={label} $active={(item.ampm || "AM") === label}>
                  {label}
                </S.AmPmButton>
              ))}
            </S.AmPmGroup>
            {item.tagLabel ? (
              <S.TagRow>
                <S.TagDot />
                <span>{item.tagLabel}</span>
              </S.TagRow>
            ) : null}
          </S.TimeCol>
          <S.TimeDisplayCol>
            <S.TimeText>{item.time || "00:00"}</S.TimeText>
          </S.TimeDisplayCol>
          <S.MainCol>
            <S.TitlePill>{item.title || "일정 내용"}</S.TitlePill>
          </S.MainCol>
          {shareMode ? (
            <S.ShareCol>
              <S.ShareSelect
                type="button"
                aria-pressed={shareSelection.includes(item.id)}
                onClick={() => toggleShareSelection(item.id)}
                $selected={shareSelection.includes(item.id)}
              />
            </S.ShareCol>
          ) : (
            <S.ActionsCol>
              <S.SmallBtn onClick={() => onEdit && onEdit(item)}>수정하기</S.SmallBtn>
              {item.hasOriginal ? (
                <S.SecondaryBtn onClick={() => onViewOriginal && onViewOriginal(item)}>
                  원본 이미지 확인
                </S.SecondaryBtn>
              ) : null}
            </S.ActionsCol>
          )}
        </S.Row>
      ))}
    </S.ListWrap>
  );

  return (
    <ModalBase
      open={open}
      onClose={onClose}
      title=""
      hideHeader
      closeOnOverlayClick
      widthPx={1040}
      heightPx={760}
      noBodyPadding
      containerBg={"#FFFFFF"}
      containerShadow={"0 0 20px 0 rgba(180, 191, 255, 0.30)"}
    >
      <S.CloseFloating onClick={onClose} aria-label="close">×</S.CloseFloating>
      <S.Padding>
        <S.DateRow>
          <S.DateBox>
            <S.DateTop>
              <S.DateTitle>오늘 날짜</S.DateTitle>
            </S.DateTop>
            <S.DateBottom>
              <S.YearText>{year}년</S.YearText>
              <S.TodayBox>
                <S.TodayText>{month}월</S.TodayText>
                <S.TodayText>{date}일</S.TodayText>
                <S.Line src={LINE} alt="구분선" />
                <S.TodayText>{day}</S.TodayText>
              </S.TodayBox>
            </S.DateBottom>
          </S.DateBox>

        <S.Segmented>
          <S.SegBtn
            type="button"
            className={!shareMode ? "active" : ""}
            onClick={() => {
              setShareMode(false);
              setShareSelection([]);
            }}
            aria-pressed={!shareMode}
          >
            {title}
          </S.SegBtn>
          <S.SegBtn
            type="button"
            onClick={handleShareClick}
            className={shareMode ? "active" : ""}
            aria-pressed={shareMode}
          >
            공유하기
            <img src={shareIcon} alt="공유" style={{ width: '1.2vw', height: '1.2vw' }} />
          </S.SegBtn>
          </S.Segmented>
        </S.DateRow>

      {renderList(allItems)}

        <S.BottomBar>
          <S.ConfirmBtn onClick={onClose}>확인</S.ConfirmBtn>
        </S.BottomBar>
      </S.Padding>
    </ModalBase>
  );
}

export default ScheduleListModal;


