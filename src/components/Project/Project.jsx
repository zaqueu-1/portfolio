import React from "react";
import {
  ProjectContainer,
  ImgWrapper,
  ProjectImg,
  ProjectInfo,
  ProjectH1,
  ProjectDescription,
  StackContainer,
  Tech,
  LinkContainer,
  ExternalLink,
  Section,
} from "./Project.styles";
import { BiWindowOpen } from "react-icons/bi";
import { FiGithub } from "react-icons/fi";

const Project = ({ id, title, desc, stack, img, url, rep, lang }) => {
  return (
    <ProjectContainer id={id} data-aos={id % 2 !== 0 ? "fade-right" : "fade-left"} data-aos-duration={"1500"}>
      <ImgWrapper>
      <ProjectImg src={img} />
      </ImgWrapper>
      <ProjectInfo>
        <Section>
          <ProjectH1>{title}</ProjectH1>
          <StackContainer>
            {stack.map((tech) => {
              return <Tech>{tech}</Tech>;
            })}
          </StackContainer>
        </Section>
        <Section style={{ marginTop: "1rem" }}>
          <ProjectDescription>{desc}</ProjectDescription>
          <LinkContainer>
            <ExternalLink href={url} target="_blank">
              <BiWindowOpen style={{ marginRight: "0.3rem" }} />
              {lang ? "Acessar" : "Open"}
            </ExternalLink>
            <ExternalLink href={rep} target="_blank">
              <FiGithub style={{ marginRight: "0.3rem" }} />
              {lang ? "Github" : "Github"}
            </ExternalLink>
          </LinkContainer>
        </Section>
      </ProjectInfo>
    </ProjectContainer>
  );
};

export default Project;
