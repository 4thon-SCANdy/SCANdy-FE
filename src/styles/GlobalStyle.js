import { createGlobalStyle } from "styled-components";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui,
      Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR',
      'Malgun Gothic', sans-serif;
  }

  html, body, #root {
    height: 100%;
    width: 100%;
    background-color: #fff;
    color: #000;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul, li {
    list-style: none;
  }

  button, input, textarea {
    border: none;
    outline: none;
    background: transparent;
    font-family: inherit;
  }

  button {
    cursor: pointer;
  }
`;

export default GlobalStyle;
