import styled from "styled-components";

export const ProjectsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 12.5rem;
  @media only screen and (max-width: 419px) {
    margin-top: 10.5rem;
    padding: 0;
  }
`;

export const Wrapper = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto -1.5rem auto;
  @media only screen and (max-width: 1199px) {
    margin: 0 auto;
  }
`;

export const ProjectsH1 = styled.h1`
  font-size: 2.5rem;
  color: #999;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: .35rem;
  @media only screen and (max-width: 1199px) {
    font-size: 2rem;
    margin: 1rem auto;
  }
  @media only screen and (max-width: 419px) {
    font-size: 1.5rem;
    margin: 1rem auto;
  }
`;
