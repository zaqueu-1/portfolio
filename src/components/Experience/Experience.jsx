import React from "react"
import {
  ExperienceContainer,
  ImgWrapper,
  ExperienceImg,
  ExperienceInfo,
  StackContainer,
  Tech,
  ExperienceHeader,
  ExperienceSub,
} from "./Experience.styles"

const Experience = ({ id, title_pt, title_en, company, date, stack, img, lang }) => {
  return (
    <ExperienceContainer id={id} >
      <ImgWrapper>
        <ExperienceImg src={require(`../../${img}`)} />
      </ImgWrapper>
      <ExperienceInfo>
        <ExperienceHeader>{company}</ExperienceHeader>
        <ExperienceSub>{lang ? title_pt + ` (${date})` : title_en + ` (${date})`}</ExperienceSub>
        <StackContainer>
          {stack.map((tech) => {
            return <Tech>{tech}</Tech>
          })}
        </StackContainer>
      </ExperienceInfo>
    </ExperienceContainer>
  )
}

export default Experience
