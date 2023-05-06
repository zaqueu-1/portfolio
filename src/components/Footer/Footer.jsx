import React from "react";
import { FooterContainer, GoTop } from "./Footer.styles";

const Footer = ({ lang, onGetScrollSection }) => {
  return (
    <FooterContainer>
      <GoTop onClick={() => {onGetScrollSection("header");}}>
        {lang 
          ? "Voltar ao topo" 
          : "Back to the top"}
      </GoTop>
    </FooterContainer>
  );
};

export default Footer;
