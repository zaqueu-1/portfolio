import styled from "styled-components";

export const ProjectsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 12.5rem;
  @media only screen and (max-width: 417px) {
    margin-top: 10.5rem;
  }
`;

export const Wrapper = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto -1.5rem auto;
  @media only screen and (max-width: 900px) {
    margin: 0 auto;
  }
  @media only screen and (max-width: 417px) {
    margin: 0 auto;
  }
`;

export const H1 = styled.h1`
  font-size: 2.5rem;
  color: #999;
  @media only screen and (max-width: 900px) {
    font-size: 2rem;
    margin: 0 auto;
  }
  @media only screen and (max-width: 417px) {
    font-size: 1.5rem;
    margin: 0 auto;
  }
`;
