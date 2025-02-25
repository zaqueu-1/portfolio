import React from "react"
import {
  HeaderH1,
  HeaderContainer,
  SubWrapper,
  SubtitleText
} from "./Hero.styles"
import { data } from "../../data"
import Skills from "../Skills/Skills"

const Hero = ({ lang }) => {
  const title = "Eduardo Zaqueu"
  const skills = ["TypeScript", "ReactJS", "NextJS", "VueJS"]

  return (
    <HeaderContainer>
      <HeaderH1 data-aos={"fade-right"} data-aos-duration={"1500"}>{title}</HeaderH1>
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
        <Skills lang={lang} tech={skills} />
      </SubWrapper>
    </HeaderContainer>
  )
}

export default Hero
