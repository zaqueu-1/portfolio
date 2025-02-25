import styled from "styled-components"

export const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`

export const Skill = styled.p`
  padding: 0.3rem 0.8rem;
  border-radius: 12px 1px 12px 1px;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur( 8px );
  -webkit-backdrop-filter: blur( 8px );
  border: 1px solid transparent;
  font-size: 1rem;
  cursor: pointer;
  margin: 0;
  justify-content: center;
  align-items: center;
`