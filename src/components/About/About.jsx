import {
  AboutContainer,
  FlexContainer,
  ImageWrapper,
  DescWrapper,
  AboutTitle,
  AboutP,
  Tech,
} from "./About.styles"
import React from "react"
import Avatar from "../Avatar/Avatar"
import cvpt from "../../docs/eduardo-zaqueu-cv-min.pdf"
import { BsLinkedin, BsGithub,  } from 'react-icons/bs'

const About = ({ lang }) => {
  const age = Number((new Date().getFullYear()) - 1995)

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
                ? "Sobre mim" 
                : "About me"}
            </AboutTitle>
            <AboutP>
              {`Eduardo Zaqueu, ${age} | Rio de Janeiro, RJ`}
            </AboutP>
            <AboutP>
              {lang 
                ? (
                  <div>
                    <i>Um desenvolvedor que acredita no poder da comunicação e das soft skills.</i>
                    <p>Faço parte do time de desenvolvimento da <a href="https://hurb.com/br" target="_blank" rel="noreferrer">Hurb</a>, atuando a maior parte do tempo no front-end com JavaScript e seus frameworks. Sou fascinado por aprender e compartilhar aquilo que domino e me sinto à vontade estando ao redor de profissionais que buscam o crescimento. Comunicação e curiosidade são minhas palavras-chave.</p>
                  </div>
                )
                : (
                  <div>
                    <p>A developer who believes in the power of communication and soft skills.</p>
                    <p>I'm part of <a href="https://hurb.com" target="_blank" rel="noreferrer">Hurb</a> development team, working on front-end with JavaScript and it's frameworks. I'm excited to learn and share what I know and am comfortable around professionals who seek growth. Communication and curiosity are my key words. </p>
                  </div>
                ) }
            </AboutP>
            <AboutP>
              {lang
                ? `Quer saber mais sobre mim? Dê uma olhada em meu currículo logo abaixo.`
                : 'Want to know more? Check out my resume below.'}
            </AboutP>
            <Tech href={cvpt} download>
              {lang 
                ? 'Baixar currículo' 
                : 'Download resume'}
            </Tech>
        </DescWrapper>
        </FlexContainer>
      </AboutContainer>
    </>
    
  );
};

export default About;