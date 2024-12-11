import React from "react"
import {
  ExperienceContainer,
  ExperienceWrapper,
  ImgWrapper,
  ExperienceImg,
  ExperienceTitleWrapper,
  StackContainer,
  Tech,
  ExperienceHeader,
  ExperienceSub,
  VisitButton
} from "./Experience.styles"

const Experience = ({ id, exp, lang }) => {
  return (
    <ExperienceContainer id={id} >
      <ExperienceWrapper>
        <ImgWrapper>
          <ExperienceImg src={require(`../../${exp.img}`)} />
        </ImgWrapper>
        <ExperienceTitleWrapper>
          <ExperienceHeader
            onClick={() => {
              window.open(exp.url, "_blank")
            }}
          >
            {exp.company}
            <VisitButton>
              {"🔗"}
            </VisitButton>
          </ExperienceHeader>
          <ExperienceSub>
            {lang ? exp.title_pt : exp.title_en}
          </ExperienceSub>
        </ExperienceTitleWrapper>
      </ExperienceWrapper>
      <StackContainer>
        {exp.stack.map((tech) => {
          return <Tech>{tech}</Tech>
        })}
      </StackContainer>
    </ExperienceContainer>
  )
}

export default Experience
