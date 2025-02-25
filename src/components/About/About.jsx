import {
  AboutContainer,
  AboutText
} from "./About.styles"
import React from "react"
import SocialLinks from "../SocialLinks/SocialLinks"
import { data } from "../../data.js"

const About = ({ lang }) => {
  return (
    <AboutContainer data-aos={"fade-down"} data-aos-delay={"500"} data-aos-duration={"1500"}>
      <AboutText data-aos={"fade-left"} data-aos-delay={"500"} data-aos-duration={"1500"}>
        {lang ? data.about.info.pt.p1 : data.about.info.en.p1}
      </AboutText>
      <SocialLinks lang={lang} />
    </AboutContainer>
  )
}

export default About