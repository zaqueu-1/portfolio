import React from "react"
import {
  ProjectContainer,
  ImgWrapper,
  ProjectImg,
  ProjectInfo,
  ProjectDescription,
  StackContainer,
  Tech,
  Section,
  ProjectHeader,
  ProjectSub,
} from "./Project.styles"

const Project = ({ id, title_pt, title_en, desc_pt, desc_en, company, date, stack, img, lang }) => {
  return (
    <ProjectContainer id={id} 
      data-aos={id % 2 !== 0 ? "fade-right" : "fade-left"} 
      data-aos-duration={"1500"}>
      <ImgWrapper><ProjectImg src={require(`../../${img}`)} /></ImgWrapper>
      <ProjectInfo>
        <Section>
          <ProjectHeader>{company}</ProjectHeader>
          <ProjectSub>{lang ? title_pt : title_en}</ProjectSub>
          <ProjectSub>{date}</ProjectSub>
          <ProjectDescription>{lang ? desc_pt : desc_en}</ProjectDescription>
          <StackContainer>
            {stack.map((tech) => {
              return <Tech>{tech}</Tech>
            })}
          </StackContainer>
        </Section>
      </ProjectInfo>
    </ProjectContainer>
  )
}

export default Project
