import React from "react"
import { data } from "../../data.js"
import Experience from "../Experience/Experience.jsx"
import { ProjectsContainer, ProjectsH1, Wrapper } from "./Projects.styles.js"
import { AiOutlineFundProjectionScreen } from "react-icons/ai"

const Projects = ({ lang }) => {
  return (
    <ProjectsContainer>
      <Wrapper data-aos={"zoom-in"} data-aos-duration={"1200"}>
      <ProjectsH1><AiOutlineFundProjectionScreen style={{ fontSize: "1.8rem" }} />
        {lang 
          ? "Experiência" 
          : "Experience"}
      </ProjectsH1>
      </Wrapper>
      {data.experiences.map((exp) => {
        return (
          <Experience
            id={exp.id}
            title_pt={exp.title_pt}
            title_en={exp.title_en}
            desc_pt={exp.desc_pt}
            desc_en={exp.desc_en}
            company={exp.company}
            date={exp.date}
            stack={exp.stack}
            lang={lang}
            img={exp.img}
          />
        )
      })}
    </ProjectsContainer>
  )
}

export default Projects
