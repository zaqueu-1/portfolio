import { createGlobalStyle } from "styled-components";
import styled from "styled-components";


export const GlobalStyle = createGlobalStyle`

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

::-webkit-scrollbar{
width: 6px;
height: 10px;
}
::-webkit-scrollbar-thumb{
background: #333333;
border-radius: 0px;
}
::-webkit-scrollbar-thumb:hover{
background:rgba(0,0,0,0.2);
}
::-webkit-scrollbar-track{
background: #111111;
border-radius: 0px;
box-shadow: inset -0.4px 0px 0px 0px #F0F0F0;
}

html,
body {
  font-family: "Poppins", sans-serif;
  color: #bfbfbf;
  cursor: default;
  overflow-x: hidden;
}

a {
  color: inherit;
  text-decoration: none;
}
`;

export const LanguageControlMain = styled.div`
  padding: 10px 15px;
  border-radius: 50px;
  position: fixed;
  font-size: 160px;
  top: 0;
  left: 0;
  margin: 10px;
  z-index: 999;
  cursor: pointer;
`;

export const LanguageTogglerMain = styled.button`
  display: flex;
  font-size: 16px;
  cursor: pointer;
  background: transparent;
  outline: none;
  border: none;
  color: #f5f5f5;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.03);
    color: #999;
  }
`;
