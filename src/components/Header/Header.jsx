import React from "react"
import {
  HeaderH1,
  HeaderContainer,
  HeaderWrapper,
  SubWrapper,
  SubtitleText,
  SkillsContainer,
  Skill,
} from "./Header.styles"
import { data } from "../../data"


const Header = ({ lang }) => {
  const title = "Eduardo Zaqueu"

  const goTo = (url) => () => {
    window.open(url, "_blank")
  }

  return (
    <HeaderContainer>
      <HeaderWrapper data-aos={"fade-right"} data-aos-duration={"1500"}>
        <HeaderH1>{title}</HeaderH1>
      </HeaderWrapper>
      <SubWrapper>
        <SubtitleText
          data-aos={"fade-down"}
          data-aos-delay={window.innerWidth < 800 ? "450" : "900"}
          data-aos-duration={"1200"}>
            {lang 
              ? data.about.title.pt 
              : data.about.title.en
          }
        </SubtitleText>
        <SkillsContainer
          data-aos={"fade-down"}
          data-aos-delay={window.innerWidth < 800 ? "600" : "1200"}
          data-aos-duration={"1200"}
        >
          <Skill onClick={goTo('https://www.typescriptlang.org/docs/')}>TypeScript</Skill>
          <Skill onClick={goTo('https://reactjs.org/docs/getting-started.html')}>ReactJS</Skill>
          <Skill onClick={goTo('https://nextjs.org/')}>NextJS</Skill>
          <Skill onClick={goTo('https://vuejs.org/guide/introduction.html')}>VueJS</Skill>
        </SkillsContainer>
      </SubWrapper>
    </HeaderContainer>
  )
}

export default Header
