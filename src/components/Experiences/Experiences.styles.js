import styled from "styled-components";

export const ExperiencesWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  padding: 4rem;
  justify-items: center;

  @media screen and (max-width: 680px) {
    grid-template-columns: repeat(1, 1fr);
    padding: 0rem;
  }

`;
