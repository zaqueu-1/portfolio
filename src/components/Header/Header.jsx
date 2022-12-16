import React from "react";
import {
  BoxSpacer,
  HeaderH1,
  HeaderContainer,
  H1Container,
  SubtitleContainer,
  SubtitleText,
  SkillsContainer,
  Skill,
} from "./Header.styles";
import { data } from "../../data";
import ReactTooltip from "react-tooltip";


const Header = ({ lang }) => {
  const title = "Eduardo Zaqueu";

  return (
    <HeaderContainer>
      <ReactTooltip />
      <BoxSpacer>
        <H1Container>
          <div data-aos={"fade-right"} data-aos-duration={"1500"}>
          <HeaderH1>{title}</HeaderH1>
          </div>
        </H1Container>
        <SubtitleContainer>
        <SubtitleText
          data-aos={"fade-down"}
          data-aos-delay={window.innerWidth < 800 ? "0" : "900"}
          data-aos-duration={"1200"}>
            {lang 
              ? data.about.pt 
              : data.about.en}
        </SubtitleText>
        <SkillsContainer
          data-aos={"fade-down"}
          data-aos-delay={window.innerWidth < 800 ? "0" : "1200"}
          data-aos-duration={"1200"}>
            {data.skills.map((skill) => {
              return <Skill>{skill}</Skill>;
              })}
        </SkillsContainer>
        </SubtitleContainer>
      </BoxSpacer>
    </HeaderContainer>
  );
};

export default Header;
