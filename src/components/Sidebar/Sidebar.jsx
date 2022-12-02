import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import {
  SidebarContainer,
  SidebarIcon,
  SidebarSection,
  SidebarItem,
  SidebarSpan,
  SidebarSpacer,
  SidebarSubSpan,
  CloseSidebar,
  LanguageControl,
  LanguageToggler,
} from "./Sidebar.styles";
import { IoReorderThreeOutline } from "react-icons/io5";
import { MdLanguage } from "react-icons/md";
import ReactTooltip from "react-tooltip";
import { FaLinkedinIn } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";

const Sidebar = ({ onGetLang, onGetScrollSection, lang }) => {

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const sidebarToggler = () => setSidebarIsOpen(!sidebarIsOpen);

  return (
    <>
      <ReactTooltip />
      <SidebarIcon onClick={sidebarToggler}>
        <IoReorderThreeOutline />
      </SidebarIcon>
      <SidebarContainer isOpen={sidebarIsOpen}>
        <CloseSidebar onClick={sidebarToggler}>
          <AiOutlineClose />
        </CloseSidebar>
        <SidebarSection>
          <SidebarItem
            onClick={() => {
              onGetScrollSection("header");
              sidebarToggler();
            }}
          >
            <SidebarSpan>{lang ? "Início" : "Home"}</SidebarSpan>
          </SidebarItem>
          <SidebarItem
            onClick={() => {
              onGetScrollSection("about");
              sidebarToggler();
            }}
          >
            <SidebarSpan>{lang ? "Sobre mim" : "About me"}</SidebarSpan>
          </SidebarItem>
          <SidebarItem
            onClick={() => {
              onGetScrollSection("projects");
              sidebarToggler();
            }}
          >
            <SidebarSpan>{lang ? "Projetos" : "Projects"}</SidebarSpan>
          </SidebarItem>
          <SidebarItem
            onClick={() => {
              onGetScrollSection("contact");
              sidebarToggler();
            }}
          >
            <SidebarSpan>{lang ? "Contato" : "Contact Info"}</SidebarSpan>
          </SidebarItem>
        </SidebarSection>
        <SidebarSpacer />
        <SidebarSection>
          <SidebarItem>
          <FiGithub /><SidebarSubSpan>
              <a href="https://github.com/zaqueu-1" target="_blank" rel="noreferrer">
                Github
              </a>
            </SidebarSubSpan>
          </SidebarItem>
          <SidebarItem>
          <FaLinkedinIn /><SidebarSubSpan>
              <a href="https://www.linkedin.com/in/zaqueu1" target="_blank" rel="noreferrer">
                LinkedIn
              </a>{" "}
            </SidebarSubSpan>
          </SidebarItem>
        </SidebarSection>
        <LanguageControl data-tip={lang ? "Mudar idioma" : "Switch language"}>
          <LanguageToggler
            onClick={() => {
              onGetLang(!lang);
            }}
          >
            <MdLanguage style={{ marginRight: ".6rem" }} />
            {lang ? "Change to English" : "Mudar para Português"}
          </LanguageToggler>
        </LanguageControl>
      </SidebarContainer>
    </>
  );
};

export default Sidebar;
