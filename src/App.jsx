import MainPage from "./pages/mainPage/MainPage";
import GlobalStyle from "./styles/GlobalStyle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ModalPlayground from "@/pages/modalPlayground/ModalPlayground";
import LoginPage from "./pages/loginPage/LoginPage";
import LoginCallback from "./pages/loginPage/components/LoginCallback";
import SessionAuth from "./routes/SessionAuth";

function App() {
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
