import React from "react";
import {
  HeaderH1,
  HeaderContainer,
  H1Container,
  SocialMediaContainer,
  ExternalLink,
  SubtitleContainer,
  SubtitleText,
  SkillsContainer,
  Skill,
} from "./Header.styles";
import { FaLinkedinIn } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import { data } from "../../data";
import ReactTooltip from "react-tooltip";


const Header = ({ lang }) => {
  const title = "Eduardo Zaqueu";

  return (
    <HeaderContainer>
      <ReactTooltip />
      <H1Container>
        <div data-aos={"fade-right"} data-aos-duration={"1500"}>
          <HeaderH1>{title}</HeaderH1>
        </div>
        <SocialMediaContainer data-aos={"fade-left"} data-aos-delay={"300"} data-aos-duration={"1500"}>
          <ExternalLink
            data-tip={lang ? "Github" : "Github"}
            href="https://github.com/zaqueu-1"
            target="_blank">
            <FiGithub /></ExternalLink>
          <ExternalLink
            data-tip={lang ? "LinkedIn" : "LinkedIn"}
            href="https://www.linkedin.com/in/zaqueu1"
            target="_blank">
            <FaLinkedinIn /></ExternalLink>
        </SocialMediaContainer>
      </H1Container>
      <SubtitleContainer>
        <SubtitleText
          data-aos={"fade-down"}
          data-aos-delay={window.innerWidth < 800 ? "0" : "900"}
          data-aos-duration={"1200"}>
          {lang ? data.about.pt : data.about.en}</SubtitleText>
        <SkillsContainer
          data-aos={"fade-down"}
          data-aos-delay={window.innerWidth < 800 ? "0" : "1200"}
          data-aos-duration={"1200"}>
          {data.skills.map((s) => {
            return <Skill>{s}</Skill>;
          })}</SkillsContainer>
      </SubtitleContainer>
    </HeaderContainer>
  );
};

export default Header;
