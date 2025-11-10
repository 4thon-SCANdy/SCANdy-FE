import { createGlobalStyle } from "styled-components";
import "pretendard/dist/web/static/pretendard.css";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
  }

html, body, #root {
    height: 100%;
    width: 100%;
    background-color: #fff;
    color: #000;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    overflow: hidden;
    -ms-overflow-style: none; 
    scrollbar-width: none;     
  }

  html::-webkit-scrollbar,
  body::-webkit-scrollbar {
    display: none; 
  }

  .scroll-visible {
    overflow-y: auto !important;
  }
  .scroll-visible::-webkit-scrollbar {
    display: block !important;
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
