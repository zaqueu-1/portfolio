import {
    LinksContainer,
    ExternalLink,
  } from "./SocialLinks.styles";
  import { FaLinkedinIn } from "react-icons/fa"
  import { FiGithub } from "react-icons/fi"
  import { BsInstagram } from 'react-icons/bs'
  import { RiDiscordFill } from "react-icons/ri"
  import React from "react"
  import ReactTooltip from "react-tooltip"
  
  const SocialLinks = ({ lang }) => {
  
    return (
        <LinksContainer>
            <ReactTooltip />
            <ExternalLink
                data-tip="Github"
                href="https://github.com/zaqueu-1"
                target="_blank">
                <FiGithub />
            </ExternalLink>
            <ExternalLink
                data-tip="LinkedIn"
                href="https://linkedin.com/in/zaqueu1"
                target="_blank">
                <FaLinkedinIn />
            </ExternalLink>
            <ExternalLink
                data-tip="Discord"
                href="https://discordapp.com/users/856969236684603422"
                target="_blank">
            <   RiDiscordFill />
            </ExternalLink>
            <ExternalLink
                data-tip="Instagram"
                href="https://instagram.com/zaqueu.tech"
                target="_blank">
                <BsInstagram />
            </ExternalLink>
        </LinksContainer> 
    )
  }
  
  export default SocialLinks