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
  ELButton,
  Section,
} from "./Project.styles";
import { BiWindowOpen } from "react-icons/bi";
import { FiGithub } from "react-icons/fi";

const Project = ({ id, title, desc, stack, img, url, rep, lang }) => {
  return (
    <ProjectContainer id={id} 
      data-aos={id % 2 !== 0 ? "fade-right" : "fade-left"} 
      data-aos-duration={"1500"}>
      <ImgWrapper><ProjectImg style={{filter: 'drop-shadow(-6px 6px 0px #757666)'}} src={img} /></ImgWrapper>
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
            <ELButton><ExternalLink href={url} target="_blank">
              <BiWindowOpen style={{ marginRight: "0.3rem" }} />
                {lang 
                  ? "Acessar" 
                  : "Open"}
            </ExternalLink></ELButton>
              {rep.length > 0 && (
                <>
                  <ELButton><ExternalLink href={rep} target="_blank">
                    <FiGithub style={{ marginRight: "0.3rem" }} />
                      Github
                    </ExternalLink></ELButton>
                </>
              )}
          </LinkContainer>
        </Section>
      </ProjectInfo>
    </ProjectContainer>
  );
};

export default Project;
