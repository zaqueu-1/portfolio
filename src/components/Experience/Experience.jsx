import React from "react"
import {
  ExperienceContainer,
  ImgWrapper,
  ExperienceImg,
  ExperienceInfo,
  StackContainer,
  Tech,
  Section,
  ExperienceHeader,
  ExperienceSub,
} from "./Experience.styles"

const Experience = ({ id, title_pt, title_en, company, date, stack, img, lang }) => {
  return (
    <ExperienceContainer id={id} 
      data-aos={id % 2 !== 0 ? "fade-right" : "fade-left"} 
      data-aos-duration={"1500"}>
      <ImgWrapper><ExperienceImg src={require(`../../${img}`)} /></ImgWrapper>
      <ExperienceInfo>
        <Section>
          <ExperienceHeader>{company}</ExperienceHeader>
          <ExperienceSub>{lang ? title_pt : title_en}</ExperienceSub>
          <ExperienceSub>{date}</ExperienceSub>
          <StackContainer>
            {stack.map((tech) => {
              return <Tech>{tech}</Tech>
            })}
          </StackContainer>
        </Section>
      </ExperienceInfo>
    </ExperienceContainer>
  )
}

export default Experience
