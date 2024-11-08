import React from "react"
import { data } from "../../data.js"
import Experience from "../Experience/Experience.jsx"
import { ExperiencesContainer, ExperiencesH1, TitleWrapper, ExperiencesWrapper } from "./Experiences.styles.js"
import { AiOutlineFundProjectionScreen } from "react-icons/ai"

const Experiences = ({ lang }) => {
  return (
    <ExperiencesContainer>
      <TitleWrapper data-aos={"zoom-in"} data-aos-duration={"1200"}>
        <ExperiencesH1><AiOutlineFundProjectionScreen style={{ fontSize: "1.8rem" }} />
          {lang 
            ? "Experiência" 
            : "Experience"}
        </ExperiencesH1>
      </TitleWrapper>
      <ExperiencesWrapper 
        data-aos={"fade-left"} 
        data-aos-duration={"1500"} >
        {data.experiences.map((exp) => {
          return (
            <Experience
              id={exp.id}
              title_pt={exp.title_pt}
              title_en={exp.title_en}
              company={exp.company}
              date={exp.date}
              stack={exp.stack}
              lang={lang}
              img={exp.img}
            />
          )
        })}
      </ExperiencesWrapper>
    </ExperiencesContainer>
  )
}

export default Experiences
