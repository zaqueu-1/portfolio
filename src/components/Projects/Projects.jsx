import React from "react";
import { data } from "../../data";
import Project from "../Project/Project.jsx";
import { ProjectsContainer, ProjectsH1, Wrapper } from "./Projects.styles";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";

const Projects = ({ lang }) => {
  return (
    <ProjectsContainer>
      <Wrapper data-aos={"zoom-in"} data-aos-duration={"1200"}>
      <ProjectsH1><AiOutlineFundProjectionScreen style={{ marginRight: "0.4rem", fontSize: "1.8rem" }} />
        {lang 
          ? "Últimos Projetos" 
          : "Latest Projects"}
      </ProjectsH1>
      </Wrapper>
      {data.projects.map((proj) => {
        return (
          <Project
            id={proj.id}
            img={proj.img}
            title={proj.title}
            desc={lang ? proj.desc : proj.descEn}
            stack={proj.stack}
            url={proj.url}
            rep={proj.rep}
            lang={lang}
          />
        );
      })}
    </ProjectsContainer>
  );
};

export default Projects;
