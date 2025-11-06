import * as S from "./LoginPage.style";

import LOGO from "@/assets/main/logo.svg";
import GOOGLE from "@/assets/main/google.svg";
import LoginCalendar from "./components/LoginCalendar";
import { useLayoutEffect, useRef, useState } from "react";

const LoginPage = () => {
  const scrollRef = useRef(null);
  const [nowMonth, setNowMonth] = useState(18); // 3(년)*12(달) / 2 = 이번 달
  const isScrolling = useRef(false); // 스크롤 중복 방지

  const handleWheel = (e) => {
    if (isScrolling.current) return;
    isScrolling.current = true;

    const total = 36; // 3년 치만 보여 주도록 설정

    if (e.deltaY > 0) {
      // 아래 -> 다음 달
      setNowMonth((prev) => (prev + 1) % total);
    } else if (e.deltaY < 0) {
      // 위 -> 지난 달
      setNowMonth((prev) => (prev - 1 + total) % total);
    }
  };

  useLayoutEffect(() => {
    // 페이지 첫 렌더링 시 바로 가운데
    const container = scrollRef.current;
    const children = container.children;
    const target = children[nowMonth];
    if (!target) return;

    const center =
      target.offsetTop - container.clientHeight / 2 + target.clientHeight / 2;

    container.scrollTo({
      top: center,
      behavior: "auto",
    });
  }, []);

  return (
    <S.LoginContainer>
      <S.ScrollCalendar ref={scrollRef} onWheel={handleWheel}>
        {Array.from({ length: 36 }, (_, i) => (
          <LoginCalendar key={i} monthOffset={i - 18} />
        ))}
      </S.ScrollCalendar>
      <S.LoginRight>
        <S.Logo src={LOGO} />
        <S.LoginBtn>
          <S.GoogleBtn>
            <S.GoogleImg src={GOOGLE} />
            <p>구글로 시작하기</p>
          </S.GoogleBtn>
          <S.BasicBtn>
            <p>가입 없이 사용하기</p>
          </S.BasicBtn>
        </S.LoginBtn>
      </S.LoginRight>
    </S.LoginContainer>
  );
};

export default LoginPage;
