import React from "react";
import {
  ContactContainer,
  ContactH1,
  FlexContainer,
  ContactP,
  ContactWrapper,
  ContactSpan,
  IconWrapper,
  ExternalLink,
} from "./Contact.styles";
import { AiOutlineMail } from "react-icons/ai";
import { FaWhatsapp } from "react-icons/fa";
import { RiContactsLine } from "react-icons/ri";
import ReactTooltip from "react-tooltip";

const Contact = ({ lang }) => {
  return (
    <ContactContainer>
      <ReactTooltip />
      <div data-aos={"zoom-in"} data-aos-duration={"1200"}>
        <ContactH1><RiContactsLine style={{ marginRight: "0.4rem", fontSize: "2.5rem" }} />{lang ? "Entre em Contato" : "Get in touch"}</ContactH1>
      </div>
      <FlexContainer data-aos={"fade-left"} data-aos-duration={"1200"}>
          <ContactH1>{lang ? "" : ""}</ContactH1>
          <ContactP>
            {lang
              ? ``
              : ``}
          </ContactP>
          <ExternalLink
            data-tip={lang ? "enviar e-mail" : "send e-mail"}
            href="mailto:bss.eduardo@yahoo.com.br"
            target="_blank">
            <ContactWrapper>
              <IconWrapper>
                <AiOutlineMail />
                </IconWrapper>
                <ContactSpan>E-mail</ContactSpan>
            </ContactWrapper>     
          </ExternalLink>
          <ExternalLink
            data-tip={lang ? "fale comigo" : "talk with me"}
            href="https://wa.me/5521989122887"
            target="_blank">
            <ContactWrapper>
              <IconWrapper>
                <FaWhatsapp />
                </IconWrapper>
                <ContactSpan>WhatsApp</ContactSpan>
            </ContactWrapper>     
          </ExternalLink>
      </FlexContainer>
    </ContactContainer>
  );
};

export default Contact;
