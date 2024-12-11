import styled from "styled-components";

export const ExperienceContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  align-items: flex-start;
  justify-content: flex-start;
  gap: .5rem;  
  &:hover {
    button {
      opacity: 1;
    };
`;

export const ExperienceWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: .5rem;
  width: 100%;
`;

export const ImgWrapper = styled.div`
`;

export const ExperienceTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: .25rem;
  height: 60px;
`;

export const ExperienceImg = styled.img`
  width: 60px;
  border-radius: 8px;
  transition: all 0.4s ease-in-out;
  background: rgb( 255, 255, 255);
`;

export const ExperienceHeader = styled.a`
  font-size: 1.6rem;
  font-weight: 400;
  cursor: pointer;
  display: flex;
  gap: .25rem;
  @media only screen and (max-width: 1199px) {
    font-size: 1.4rem;
  }
  @media only screen and (max-width: 680px) {
    font-size: 1.2rem;
  }
`;

export const VisitButton = styled.button`
  border: none;
  cursor: pointer;
  background: transparent;
  font-size: 12px;
  color: white;
  padding: 0.25rem;
  transition: all 0.2s ease-in-out;
  opacity: 0;
  width: 20px;
  &:hover {
    background-color: rgba( 0, 0, 0, 0.9 );
    background: transparent;
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

export const Tech = styled.span`
  background: rgba( 0, 0, 0, 0.1 );
  backdrop-filter: blur( 8px );
  -webkit-backdrop-filter: blur( 8px );
  padding: 0.3rem 0.8rem;
  border-radius: 12px 1px 12px 1px;
  border: 1px solid #222;
  font-size: 12px;
`;

export const StackContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: .25rem;
  width: 100%;
`;