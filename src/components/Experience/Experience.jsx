import React from "react"
import {
  ExperienceContainer,
  ExperienceWrapper,
  ExperienceImg,
  ExperienceHeader,
  ExperienceSub,
} from "./Experience.styles"
import Skills from "../Skills/Skills"
const Experience = ({ id, exp, lang }) => {
  return (
    <ExperienceContainer id={id} >
      <ExperienceWrapper>
        <ExperienceImg src={require(`../../${exp.img}`)} />
        <ExperienceHeader
          onClick={() => {
            window.open(exp.url, "_blank")
          }}
          data-aos={"fade-right"} data-aos-duration={"1200"}
        >
          {exp.company}
          <span>
            {lang ? exp.title_pt : exp.title_en}
          </span>
        </ExperienceHeader>
      </ExperienceWrapper>
      <ExperienceSub data-aos={"fade-left"} data-aos-duration={"1200"}>
        {lang && exp.descPT && exp.descPT.map((desc, index) => {
          return (
            <p key={index}>• {desc}</p>
          )
        })}
        {!lang && exp.descEN && exp.descEN.map((desc, index) => {
          return (
            <p key={index}>- {desc}</p>
          )
        })}
        <Skills lang={lang} tech={exp.stack} />
      </ExperienceSub>
    </ExperienceContainer>
  )
}

export default Experience
