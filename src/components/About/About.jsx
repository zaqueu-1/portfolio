
import {
  AboutContainer,
  FlexContainer,
  ImageWrapper,
  DescWrapper,
  AboutTitle,
  AboutP,
  Tech,
} from "./About.styles";
import React from "react";
import Avatar from "../Avatar/Avatar";
import { data } from "../../data";
import cveng from "../../docs/eduardo-zaqueu-cv-eng.pdf";
import cvpt from "../../docs/eduardo-zaqueu-cv-pt.pdf";

const About = ({ lang }) => {

  return (
    <AboutContainer>
      <FlexContainer>
        <div data-aos={"zoom-in"} data-aos-duration={"1200"}>
          <ImageWrapper>
            <Avatar />
          </ImageWrapper>
        </div>
        <DescWrapper data-aos={"fade-left"} data-aos-duration={"1200"}>
          <AboutTitle>
            {lang 
              ? "Opa, deixa eu me apresentar..." 
              : "Hey, let me introduce myself..."}
          </AboutTitle>
          <AboutP>
            {lang
              ? `Eduardo Zaqueu | 27 anos | RJ, Brasil `
              : `Eduardo Zaqueu | 27 years | RJ, Brazil`}
          </AboutP>
          <AboutP>
            {lang 
              ? data.aboutme.pt 
              : data.aboutme.en }
          </AboutP>
          <AboutP>
            {lang
              ? `Quer saber mais sobre mim? Dê uma olhada em meu currículo logo abaixo.`
              : 'Want to know more? Check out my CV below.'}
          </AboutP>
          <Tech href={lang ? cvpt : cveng} download>
            {lang 
              ? 'Baixar currículo' 
              : 'Download CV'}
          </Tech>
        </DescWrapper>
        </FlexContainer>
    </AboutContainer>
  );
};

export default About;