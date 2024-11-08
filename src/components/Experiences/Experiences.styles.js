import styled from "styled-components";

export const ExperiencesContainer = styled.div`
  display: flex;
  min-width: 320px;
  max-width: 1200px;
  width: 100vw;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 12.5rem auto 0 auto;
  gap: 1rem;
  @media only screen and (max-width: 419px) {
    margin-top: 10.5rem;
  }
`;

export const TitleWrapper = styled.div`
  width: 100vw;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  @media only screen and (max-width: 1199px) {
    margin: 0 auto;
  }
`;

export const ExperiencesH1 = styled.h1`
  font-size: 2.5rem;
  color: #999;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: .35rem;
  @media only screen and (max-width: 1199px) {
    font-size: 2rem;
  }
  @media only screen and (max-width: 419px) {
    font-size: 1.5rem;
    margin: 1rem auto;
  }
`;

export const ExperiencesWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  padding: 1rem 2rem;
`;
