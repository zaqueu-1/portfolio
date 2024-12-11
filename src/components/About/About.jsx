import {
  AboutContainer,
  ImageWrapper,
  DescWrapper,
  AboutText,
} from "./About.styles"
import React from "react"
import Avatar from "../Avatar/Avatar"
import SocialLinks from "../SocialLinks/SocialLinks"
import { data } from "../../data.js"

const About = ({ lang }) => {
  return (
    <AboutContainer>
      <ImageWrapper>
        <Avatar />
        <SocialLinks lang={lang} />
      </ImageWrapper>
      <DescWrapper>
        <AboutText>
          {lang ? data.about.info.pt : data.about.info.en}
        </AboutText>
      </DescWrapper>
    </AboutContainer>
  )
}

export default About