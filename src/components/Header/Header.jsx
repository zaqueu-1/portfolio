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


const Header = ({ lang }) => {
  const title = "Eduardo Zaqueu"

  const goTo = (url) => () => {
    window.open(url, "_blank")
  }

  return (
    <HeaderContainer>
      <BoxSpacer>
        <H1Container>
          <div data-aos={"fade-right"} data-aos-duration={"1500"}>
            <HeaderH1>{title}</HeaderH1>
          </div>
        </H1Container>
        <SubtitleContainer>
        <SubtitleText
          data-aos={"fade-down"}
          data-aos-delay={window.innerWidth < 800 ? "450" : "900"}
          data-aos-duration={"1200"}>
            {lang 
              ? data.about.pt 
              : data.about.en}
        </SubtitleText>
        <SkillsContainer
          data-aos={"fade-down"}
          data-aos-delay={window.innerWidth < 800 ? "600" : "1200"}
          data-aos-duration={"1200"}>
          <Skill onClick={goTo('https://developer.mozilla.org/en-US/docs/Web/HTML')}>HTML</Skill>
          <Skill onClick={goTo('https://developer.mozilla.org/en-US/docs/Web/CSS')}>CSS</Skill>
          <Skill onClick={goTo('https://developer.mozilla.org/en-US/docs/Web/JavaScript')}>JavaScript</Skill>
          <Skill onClick={goTo('https://www.typescriptlang.org/docs/')}>TypeScript</Skill>
          <Skill onClick={goTo('https://nextjs.org/')}>NextJS</Skill>
          <Skill onClick={goTo('https://www.mongodb.com/docs/')}>MongoDB</Skill>
          <Skill onClick={goTo('https://expressjs.com/pt-br/4x/api.html')}>Express</Skill>
          <Skill onClick={goTo('https://reactjs.org/docs/getting-started.html')}>ReactJS</Skill>
          <Skill onClick={goTo('https://vuejs.org/guide/introduction.html')}>VueJS</Skill>
          <Skill onClick={goTo('https://nodejs.org/en/docs/')}>NodeJS</Skill>
        </SkillsContainer>
        </SubtitleContainer>
      </BoxSpacer>
    </HeaderContainer>
  );
};

export default Header;
