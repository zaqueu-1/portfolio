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

input::placeholder, textarea::placeholder {
  font-family: "Poppins", sans-serif;
  color: white;
  font-weight: 200;
  font-size: .9rem;
}

input, textarea {
  outline: none;
  font-family: "Poppins", sans-serif;
}

html,
body {
  font-family: "Poppins", sans-serif;
  color: #bfbfbf;
  cursor: default;
  overflow-x: hidden;
  scroll-behavior: smooth;
}

a {
  text-decoration: none;
}

section {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 4rem;
  height: 100vh;
  gap: 2rem;
}

@media only screen and (max-width: 1199px) {
  section {
    display: flex;
    flex-direction: column;
    padding: 2rem;
  }
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
  font-size: 1rem;
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
