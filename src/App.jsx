import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";

import MainPage from "./pages/mainPage/MainPage";
import GlobalStyle from "./styles/GlobalStyle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ModalPlayground from "@/pages/modalPlayground/ModalPlayground";
import LoginPage from "./pages/loginPage/LoginPage";
import LoginCallback from "./pages/loginPage/components/LoginCallback";
import SessionAuth from "./routes/SessionAuth";
import { useEffect } from "react";
import guestLoginApi from "@/apis/auth/guestLoginApi";

function App() {
  // 개발 환경에서 토큰 없으면 자동 게스트 로그인
  useEffect(() => {
    const hasToken =
      sessionStorage.getItem("access_token") ||
      localStorage.getItem("access_token") ||
      sessionStorage.getItem("token") ||
      localStorage.getItem("token");
    if (!hasToken && import.meta.env?.DEV) {
      (async () => {
        try {
          const res = await guestLoginApi();
          const token = res?.token;
          if (token) {
            sessionStorage.setItem("access_token", token);
          }
        } catch (e) {
          // eslint-disable-next-line no-console
          console.warn("개발용 게스트 자동 로그인 실패", e);
        }
      })();
    }
  }, []);
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/callback" element={<LoginCallback />} />

          <Route element={<SessionAuth />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/playground" element={<ModalPlayground />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
