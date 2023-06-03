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
import cvpt from "../../docs/eduardo-zaqueu-cv-br.pdf";
import { BsLinkedin, BsGithub,  } from 'react-icons/bs'

const About = ({ lang }) => {

  return (
    <>
      <AboutContainer>
        <FlexContainer>
          <div data-aos={"zoom-in"} data-aos-duration={"1200"}>
            <ImageWrapper>
              <Avatar />
              <div style={{marginTop:'1rem',gap:'.5rem',display:'flex'}} >
                <a href='https://linkedin.com/in/zaqueu1' rel='noreferrer' target='_blank'>
                  <BsLinkedin className='icon' />
                </a>
                <a href='https://github.com/zaqueu-1' rel='noreferrer' target='_blank'>
                  <BsGithub className='icon' />
                </a>
              </div>
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
                ? `Eduardo Zaqueu | Rio de Janeiro, RJ - Brasil `
                : `Eduardo Zaqueu | Rio de Janeiro, RJ - Brazil`}
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
            <Tech href={cvpt} download>
              {lang 
                ? 'Baixar currículo' 
                : 'Download CV'}
            </Tech>
        </DescWrapper>
        </FlexContainer>
      </AboutContainer>
    </>
    
  );
};

export default About;