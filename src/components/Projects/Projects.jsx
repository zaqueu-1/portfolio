import React from "react";
import { data } from "../../data";
import Project from "../Project/Project.jsx";
import { ProjectsContainer, H1, Wrapper } from "./Projects.styles";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";

const Projects = ({ lang }) => {
  return (
    <ProjectsContainer>
      <Wrapper data-aos={"zoom-in"} data-aos-duration={"1200"}>
      <H1><AiOutlineFundProjectionScreen style={{ marginRight: "0.4rem", fontSize: "2.5rem" }} />{lang ? "Projetos" : "Projects"}</H1>
      </Wrapper>

      {data.projects.map((p) => {
        return (
          <Project
            id={p.id}
            img={p.img}
            title={p.title}
            desc={lang ? p.desc : p.descEn}
            stack={p.stack}
            url={p.url}
            rep={p.rep}
            lang={lang}
          />
        );
      })}
    </ProjectsContainer>
  );
};

export default Projects;
