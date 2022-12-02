
import {
  AboutContainer,
  FlexContainer,
  ImageWrapper,
  DescWrapper,
  AboutTitle,
  AboutP,
} from "./About.styles";
import React from "react";
import Avatar from "../Avatar/Avatar";

const About = ({ lang }) => {
  return (
    <AboutContainer>
      <div data-aos={"zoom-in"} data-aos-duration={"1200"}>
      </div>
      <FlexContainer>
        <div data-aos={"zoom-in"} data-aos-duration={"1200"}>
        <ImageWrapper>
            <Avatar />
        </ImageWrapper>
        </div>
        <DescWrapper data-aos={"fade-left"} data-aos-duration={"1200"}>
          <AboutTitle>{lang ? "Opa, deixa eu me apresentar..." : "Hey, let me introduce myself..."}</AboutTitle>
          <AboutP>
          {lang
              ? `Eduardo Zaqueu | 27 anos | RJ, Brasil `
              : `Eduardo Zaqueu | 27 years | RJ, Brazil`
              }
             </AboutP>
          <AboutP>
          {lang
              ? `Talvez seja por conta do primeiro computador, em 1999, todo meu interesse na área da tecnologia. Ou talvez sejam os diversos consoles e portáteis que tive ao longo dos anos. O fato é que cresci, estudei, me desenvolvi em diversas áreas e hoje me especializo como desenvolvedor.`
              : `Maybe It was due my first computer, back in 1999, the reason of all my interest in technology. Or maybe It was due the several consoles and handhelds I had along the years. The fact is that I grew up, studied, sharpened my skills and nowadays I specialize myself as a developer.`
              }
          </AboutP>
            </DescWrapper>
        </FlexContainer>
      
       
    </AboutContainer>
  );
};

export default About;