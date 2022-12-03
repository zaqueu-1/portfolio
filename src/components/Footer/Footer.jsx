import React from "react";
import { FooterContainer, GoToTop } from "./Footer.styles";

const Footer = ({ lang, onGetScrollSection }) => {
  return (
    <FooterContainer>
      <GoToTop
        onClick={() => {
          onGetScrollSection("header");
        }}
      >
        {lang ? "Voltar ao topo" : "Back to top"}
      </GoToTop>
    </FooterContainer>
  );
};

export default Footer;
