import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai"
import {
  SidebarContainer,
  SidebarIcon,
  SidebarSection,
  SidebarItem,
  SidebarSpan,
  SidebarSpacer,
  CloseSidebar,
  LanguageControl,
  LanguageToggler,
} from "./Sidebar.styles";
import { IoReorderThreeOutline } from "react-icons/io5"
import { MdLanguage } from "react-icons/md"
import ReactTooltip from "react-tooltip"

const Sidebar = ({ onGetLang, onGetScrollSection, lang }) => {

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false)
  const sidebarToggler = () => setSidebarIsOpen(!sidebarIsOpen)

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
              onGetScrollSection("header")
              sidebarToggler()
            }}>
            <SidebarSpan>
              {lang 
                ? "Início" 
                : "Home"}
            </SidebarSpan>
          </SidebarItem>
          <SidebarItem
            onClick={() => {
              onGetScrollSection("about")
              sidebarToggler()
            }}>
            <SidebarSpan>
              {lang 
                ? "Sobre mim" 
                : "About me"}
            </SidebarSpan>
          </SidebarItem>
          <SidebarItem
            onClick={() => {
              onGetScrollSection("projects")
              sidebarToggler()
            }}>
            <SidebarSpan>
              {lang 
                ? "Projetos" 
                : "Projects"}
            </SidebarSpan>
          </SidebarItem>
          <SidebarItem
            onClick={() => {
              onGetScrollSection("contact")
              sidebarToggler()
            }}>
            <SidebarSpan>
              {lang 
                ? "Contato" 
                : "Contact Info"}
            </SidebarSpan>
          </SidebarItem>
        </SidebarSection>
        <SidebarSpacer />
        <LanguageControl data-tip={lang ? "Mudar idioma" : "Switch language"}>
          <LanguageToggler
            onClick={() => {
              onGetLang(!lang);
            }}>
            <MdLanguage style={{ marginRight: ".5rem" }} />
            {lang ? "View in English" : "Ver em Português"}
          </LanguageToggler>
        </LanguageControl>
      </SidebarContainer>
    </>
  );
};

export default Sidebar;
