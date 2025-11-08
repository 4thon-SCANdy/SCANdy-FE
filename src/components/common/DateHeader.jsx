import React from "react";
import * as S from "./DateHeader.style";

/**
 * DateHeader
 * 메인의 왼쪽 상단 '오늘 날짜 / 2025년 [ 11월 8일 | 토요일 ]' 디자인을
 * 재사용하기 위한 컴포넌트입니다.
 *
 * props:
 * - date?: Date (기본: new Date())
 * - className?: string (스타일 확장용)
 */
const DAYS = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];

function DateHeader({ date = new Date(), className }) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekday = DAYS[date.getDay()];

  return (
    <S.Wrap className={className}>
      <S.TopBadge>
        <S.BadgeText>오늘 날짜</S.BadgeText>
      </S.TopBadge>
      <S.BottomBar>
        <S.YearPill>{year}년</S.YearPill>
        <S.Capsule>
          <S.CapsuleInner>
            <S.CapsuleText>{month}월</S.CapsuleText>
            <S.CapsuleText>{day}일</S.CapsuleText>
            <S.Divider />
            <S.CapsuleText>{weekday}</S.CapsuleText>
          </S.CapsuleInner>
        </S.Capsule>
      </S.BottomBar>
    </S.Wrap>
  );
}

export default DateHeader;


