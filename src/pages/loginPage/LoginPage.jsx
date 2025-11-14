import * as S from "./LoginPage.style";

import LOGO from "@/assets/main/logo.svg";
import GOOGLE from "@/assets/main/google.svg";
import LoginCalendar from "./components/LoginCalendar";
import { useLayoutEffect, useRef, useState } from "react";
import BasicModal from "./components/BasicModal";
import GoogleModal from "./components/GoogleModal";
import GoogleSuccessModal from "./components/GoogleSuccessModal";

const LoginPage = () => {
  const [modalType, setModalType] = useState(null);

  const handleGoogleOpenModal = () => setModalType("google");
  const handleBasicOpenModal = () => setModalType("basic");
  const handleCloseModal = () => setModalType(null);

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
    <>
      <S.LoginContainer>
        <S.ScrollCalendar ref={scrollRef} onWheel={handleWheel}>
          {Array.from({ length: 36 }, (_, i) => (
            <LoginCalendar key={i} monthOffset={i - 18} />
          ))}
        </S.ScrollCalendar>
        <S.LoginRight>
          <S.Logo src={LOGO} />
          <S.LoginBtn>
            <S.GoogleContent>
              <S.GoogleBtn onClick={handleGoogleOpenModal}>
                <S.GoogleImg src={GOOGLE} />
                <p>구글로 시작하기</p>
              </S.GoogleBtn>
              <S.ErrorText>
                현재 개발 중인 서비스로, 구글 연동 시 '안전하지 않음' 경고가
                표시될 수 있습니다. <br /> 정식 출시 후에는 정상적으로 이용
                가능합니다.
              </S.ErrorText>
            </S.GoogleContent>

            <S.BasicBtn onClick={handleBasicOpenModal}>
              <p>가입 없이 사용하기</p>
            </S.BasicBtn>
          </S.LoginBtn>
        </S.LoginRight>
      </S.LoginContainer>

      {modalType === "basic" && <BasicModal onClose={handleCloseModal} />}
      {modalType === "google" && <GoogleModal onClose={handleCloseModal} />}
    </>
  );
};

export default LoginPage;
