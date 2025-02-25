import styled from "styled-components";

export const ExperiencesWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: space-between;
  align-items: flex-start;
  padding: 2rem 4rem;

  @media screen and (max-width: 680px) {
    padding: 2rem 1rem;
    justify-content: center;
    align-items: center;
  }
`;
