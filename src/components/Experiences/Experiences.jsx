import React from "react"
import { data } from "../../data.js"
import Experience from "../Experience/Experience.jsx"
import { ExperiencesWrapper } from "./Experiences.styles.js"

const Experiences = ({ lang }) => {
  return (
    <ExperiencesWrapper data-aos={"fade-right"} data-aos-duration={"1200"}>
      {data.experiences.map((exp) => {
        return (
          <Experience
            id={exp.id}
            lang={lang}
            exp={exp}
          />
        )
      })}
    </ExperiencesWrapper>
  )
}

export default Experiences
