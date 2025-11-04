import MainPage from "./pages/mainPage/MainPage";
import GlobalStyle from "./styles/GlobalStyle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ModalPlayground from "@/pages/modalPlayground/ModalPlayground";

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/playground" element={<ModalPlayground />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
