import MainPage from "./pages/mainPage/MainPage";
import GlobalStyle from "./styles/GlobalStyle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ModalPlayground from "@/pages/modalPlayground/ModalPlayground";
import LoginPage from "./pages/loginPage/LoginPage";
import LoginCallback from "./pages/loginPage/components/LoginCallback";

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/playground" element={<ModalPlayground />} />
          <Route path="/callback" element={<LoginCallback />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
