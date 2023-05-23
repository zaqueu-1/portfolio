
import {
  ContactContainer,
  ContactTitle,
  ContactSub,
  FlexContainer,
  ContactWrapper,
  ContactSpan,
  IconWrapper,
  ExternalLink,
} from "./Contact.styles";
import { AiOutlineMail } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import { BsInstagram } from 'react-icons/bs'
import { RiContactsLine, RiDiscordFill } from "react-icons/ri";
import ReactTooltip from "react-tooltip";
import React from "react";

const Contact = ({ lang }) => {
  return (
    <ContactContainer>
      <ReactTooltip />
        <div data-aos={"zoom-in"} data-aos-duration={"1200"}>
          <ContactTitle>
            <RiContactsLine style={{ marginRight: "0.4rem", fontSize: "1.6rem" }}/>
              {lang 
                ? "Contato" 
                : "Get in touch"}
          </ContactTitle>
        </div>
          <FlexContainer data-aos={"fade-left"} data-aos-duration={"1200"}>
            <ContactSub>
              {lang 
                ? "Sinta-se à vontade pra entrar em contato pelos meios abaixo:" 
                : "Feel free to contact me by any social media below:"}
            </ContactSub>
            <ContactWrapper>
              <ExternalLink
                data-tip="Github"
                href="https://github.com/zaqueu-1"
                target="_blank">
            <FiGithub />
              <ContactSpan>
                {'GitHub'}
              </ContactSpan>
              </ExternalLink>
              <ExternalLink
                data-tip="LinkedIn"
                href="https://linkedin.com/in/zaqueu1"
                target="_blank">
            <FaLinkedinIn />
              <ContactSpan>
                {'LinkedIn'}
              </ContactSpan>
              </ExternalLink>
              <ExternalLink
                data-tip="Discord"
                href="https://discordapp.com/users/856969236684603422"
                target="_blank">
            <RiDiscordFill />
              <ContactSpan>
                  {'Discord'}
              </ContactSpan>
              </ExternalLink>
              <ExternalLink
                data-tip="Instagram"
                href="https://instagram.com/zaqueu.tech"
                target="_blank">
            <BsInstagram />
              <ContactSpan>
                  {'Instagram'}
              </ContactSpan>
              </ExternalLink>
            </ContactWrapper> 
          </FlexContainer>
    </ContactContainer>
  );
};

export default Contact;