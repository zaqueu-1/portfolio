import React from "react";
import { FooterContainer, GoTop } from "./Footer.styles";
import Contact from "../Contact/Contact"

const Footer = ({ lang, onGetScrollSection }) => {
  return (
    <FooterContainer>
      <Contact lang={lang} />
      <GoTop onClick={() => {onGetScrollSection("header");}}>
        {lang 
          ? "Voltar ao topo" 
          : "Back to the top"}
      </GoTop>
    </FooterContainer>
  );
};

export default Footer;
