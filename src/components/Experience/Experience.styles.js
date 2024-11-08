import styled from "styled-components";

export const ExperienceContainer = styled.div`
  display: flex;
  height: 140px;
  width: 100%;
  min-width: 320px;
  max-width: 550px;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1rem;
  padding: .5rem;
`;

export const ImgWrapper = styled.div`
`;

export const ExperienceImg = styled.img`
  width: 100px;
  border-radius: 8px;
  transition: all 0.4s ease-in-out;
  opacity: 0.8;
  background: rgb( 255, 255, 255);
  @media only screen and (max-width: 419px) {
    width: 80px;
  }
`;

export const ExperienceInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: .25rem;
  width: 100%;
  height: 100px;
`;

export const ExperienceHeader = styled.p`
  font-size: 1.8rem;
  font-weight: 400;
  @media only screen and (max-width: 1199px) {
    font-size: 1.4rem;
  }
  @media only screen and (max-width: 419px) {
    font-size: 1.2rem;
  }
`;

export const ExperienceSub = styled.p`
  font-size: 1rem;
  font-style: italic;
  font-weight: 300;
  @media only screen and (max-width: 1199px) {
    font-size: .8rem;
  }
`;

export const StackContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: .3rem;
`;

export const Tech = styled.span`
  background: rgba( 255, 255, 255, 0.1 );
  backdrop-filter: blur( 1.5px );
  -webkit-backdrop-filter: blur( 1.5px );
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  font-size: 12px;
`;