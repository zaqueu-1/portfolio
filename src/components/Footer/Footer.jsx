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
        {lang ? "Topo" : "Top"}
      </GoToTop>
    </FooterContainer>
  );
};

export default Footer;
