
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
import { FaLinkedinIn, FaWhatsapp} from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import { RiContactsLine, RiDiscordFill } from "react-icons/ri";
import ReactTooltip from "react-tooltip";
import React from "react";

const Contact = ({ lang }) => {
  return (
    <ContactContainer>
      <ReactTooltip />
      <div data-aos={"zoom-in"} data-aos-duration={"1200"}>
        <ContactTitle><RiContactsLine style={{ marginRight: "0.4rem", fontSize: "2.5rem" }} />{lang ? "Contato" : "Get in touch"}</ContactTitle>
      </div>
      <FlexContainer data-aos={"fade-left"} data-aos-duration={"1200"}>
          <ContactSub>{lang ? "Sinta-se à vontade pra entrar em contato comigo pelos meios abaixo:" 
                            : "Feel free to contact me by any social media below:"}</ContactSub>

            <ContactWrapper>
              <ExternalLink                 
                data-tip="E-mail"
                href="mailto:bss.eduardo@yahoo.com.br"
                target="_blank">
              <IconWrapper>
                <AiOutlineMail />
              </IconWrapper>
                <ContactSpan>{lang ? "Mande uma mensagem" : "Send me a message"}</ContactSpan>
              </ExternalLink>

              {/*<ExternalLink
                data-tip="WhatsApp"
                href="https://wa.me/5521989122887"
                target="_blank">
              <IconWrapper>
                <FaWhatsapp />
              </IconWrapper>
                <ContactSpan>{lang ? "Fale diretamente comigo" : "Talk directly with me"}</ContactSpan>
              </ExternalLink>*/}

            <ExternalLink
                data-tip="Github"
                href="https://github.com/zaqueu-1"
                target="_blank">
              <IconWrapper>
                <FiGithub />
              </IconWrapper>
                <ContactSpan>{lang ? "Veja meus repositórios" : "Take a look at my repos"}</ContactSpan>
              </ExternalLink>

            <ExternalLink
                data-tip="LinkedIn"
                href="https://linkedin.com/user/zaqueu1"
                target="_blank">
              <IconWrapper>
                <FaLinkedinIn />
              </IconWrapper>
                <ContactSpan>{lang ? "Conecte-se comigo" : "Connect with me"}</ContactSpan>
              </ExternalLink>

              <ExternalLink
                data-tip="Discord"
                href="https://discordapp.com/users/856969236684603422"
                target="_blank">
              <IconWrapper>
                <RiDiscordFill />
              </IconWrapper>
                <ContactSpan>{lang ? "Bata um papo comigo" : "Let's chat"}</ContactSpan>
              </ExternalLink>
            </ContactWrapper> 

      </FlexContainer>
    </ContactContainer>
  );
};

export default Contact;