import styled from "styled-components";

export const ExperienceContainer = styled.div`
  display: flex;
  height: 25vh;
  width: 80vw;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1rem;
  padding: .5rem 4rem;
  @media only screen and (max-width: 1199px) {
    width: 90vw;
    gap: .5rem;
    align-items: flex-start;
    justify-content: space-between;
    padding: .5rem 1rem;
    height: 20vh;
  }
  @media only screen and (max-width: 419px) {
    width: 100vw;
  }
`;

export const ImgWrapper = styled.div`
`;

export const ExperienceImg = styled.img`
  width: 150px;
  border-radius: 8px;
  transition: all 0.4s ease-in-out;
  opacity: 0.8;
  background: rgb( 255, 255, 255);
  @media only screen and (max-width: 1199px) {
    width: 100px;
  }
  @media only screen and (max-width: 419px) {
    width: 80px;
  }
`;

export const ExperienceInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  @media only screen and (max-width: 1199px) {
    align-items: start;
  }
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  @media only screen and (max-width: 1199px) {
    align-items: start;
  }
`;

export const ExperienceHeader = styled.p`
  font-size: 2.2rem;
  font-weight: 400;
  @media only screen and (max-width: 1199px) {
    font-size: 1.7rem;
  }
  @media only screen and (max-width: 419px) {
    font-size: 1.2rem;
  }
`;

export const ExperienceSub = styled.p`
  font-size: 1.2rem;
  font-weight: 300;
  @media only screen and (max-width: 1199px) {
    font-size: 1rem;
  }
  @media only screen and (max-width: 419px) {
    font-size: 0.8rem;
  }
`;

export const StackContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: .3rem;
  width: 100%;
  margin-top: .5rem;
`;

export const Tech = styled.span`
  background: rgba( 255, 255, 255, 0.1 );
  backdrop-filter: blur( 1.5px );
  -webkit-backdrop-filter: blur( 1.5px );
  padding: 0.3rem 0.8rem;
  border-radius: 12px 1px 12px 1px;
  font-size: 16px;
  @media only screen and (max-width: 1199px) {
    font-size: 0.8rem;
    padding: 0.2rem;
  }
`;