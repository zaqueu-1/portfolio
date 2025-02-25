
import {
  SkillsContainer,
  Skill
} from "./Skills.styles"

const Skills = ({ lang, tech }) => {

  return (
    <SkillsContainer
        data-aos={"fade-down"}
        data-aos-delay={"300"}
        data-aos-duration={"1200"}
    >
        {tech.map((skill, index) => (
            <Skill key={index}>{skill}</Skill>
        ))}
    </SkillsContainer>
  );
};

export default Skills;