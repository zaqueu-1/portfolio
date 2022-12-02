import styled from "styled-components";

export const SidebarContainer = styled.aside`
  background: rgba(0, 0, 0, 0.3);
  box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  width: 300px;
  right: ${({ isOpen }) => (isOpen ? "0" : "-1000px")};
  transition: 0.5s ease-in-out;
  height: 100vh;
  z-index: 99;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 25px 0 0 25px;
  @media only screen and (max-width: 700px) {
    width: 100%;
  }
`;

export const SidebarIcon = styled.button`
  position: fixed;
  top: 0;
  right: 0;
  margin: .6rem;
  font-size: 2.5rem;
  background: transparent;
  outline: none;
  border: none;
  color: #dddddd;
  cursor: pointer;
  z-index: 50;
  transition: all 0.2s ease-in-out;
  &:hover {
    color: rgba(255,255,255,0.1);
  }
`;

export const SidebarMenu = styled.div``;

export const SidebarSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const SidebarItem = styled.button`
  margin: .6rem;
  outline: none;
  background: transparent;
  border: none;
  color: #dddddd;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.05);
    color: #c0c0c0;
  }
`;

export const SidebarSpan = styled.span`
  text-transform: uppercase;
  font-size: 1.2rem;
  cursor: pointer;
  padding: .6rem;
  }
`;

export const SidebarSpacer = styled.div`
  border: 1px dashed rgba(255,255,255,0.15);
  width: 30%;
  margin: .6rem 0;
`;

export const SidebarSubSpan = styled.span`
  font-size: 1rem;
  cursor: pointer;
  padding: .6rem;
  }
`;


export const CloseSidebar = styled.button`
  margin: 1rem;
  font-size: 1.9rem;
  background: transparent;
  outline: none;
  border: none;
  color: #dddddd;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  transition: all 0.2s ease-in-out;
  &:hover {
    color: rgba(255,255,255,0.1);
    transform: scale(1.05);
  }
`;

export const LanguageControl = styled.div`
  position: relative;
  bottom: 0;
  left: 0;
  margin: 3rem;
`;

export const LanguageToggler = styled.button`
  display: flex;
  font-size: 1rem;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  background: transparent;
  outline: none;
  border: none;
  color: #dddddd;
  &:hover {
    transform: scale(1.05);
    color: #c0c0c0;
  }
`;
