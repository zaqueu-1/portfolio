import {
  AboutContainer,
  ImageWrapper,
  DescWrapper,
  AboutTitle,
  AboutP,
  Resume,
} from "./About.styles"
import React from "react"
import Avatar from "../Avatar/Avatar"
import cvpt from "../../docs/eduardo-zaqueu-cv-min.pdf"
import SocialLinks from "../SocialLinks/SocialLinks"

const About = ({ lang }) => {
  const age = Number((new Date().getFullYear()) - 1995)

  return (
    <AboutContainer>
      <ImageWrapper data-aos={"zoom-in"} data-aos-duration={"1200"}>
        <Avatar />
        <SocialLinks lang={lang} />
      </ImageWrapper>
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
                <p>Faço parte do time de engenharia da <a href="https://hurb.com/br" target="_blank" rel="noreferrer">Hurb</a>. Sou fascinado por aprender e compartilhar aquilo que sei e me sinto à vontade estando ao redor de profissionais que buscam crescimento. Comunicação e curiosidade são minhas palavras-chave.</p>
              </div>
            )
            : (
              <div>
                <p>A developer who believes in the power of communication and soft skills.</p>
                <p>I am part of the engineering team at <a href="https://hurb.com" target="_blank" rel="noreferrer">Hurb</a>. Fascinated by learning and sharing what I know, I feel comfortable being around professionals who seek growth. Communication and curiosity are my keywords.</p>
              </div>
            ) }
        </AboutP>
        <AboutP>
          {lang
            ? `Quer saber mais sobre mim? Dê uma olhada em meu currículo logo abaixo.`
            : 'Want to know more? Check out my resume below.'}
        </AboutP>
        <Resume href={cvpt} download>
          {lang 
            ? 'Baixar currículo' 
            : 'Download resume'}
        </Resume>
      </DescWrapper>
    </AboutContainer>
  )
}

export default About