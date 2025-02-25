import styled from "styled-components";

export const ExperienceContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 40%;
  min-width: 350px;
  align-items: flex-start;
  justify-content: flex-start;
  gap: .25rem;  
  &:hover {
    button {
      opacity: 1;
    };
  }
`;

export const ExperienceWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1rem;
  padding: 2rem;
  width: 100%;
`;

export const ExperienceImg = styled.img`
  width: 60px;
  border-radius: 6px;
  transition: all 0.4s ease-in-out;
  border: 1px solid transparent;
  box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.2);
  background: rgba( 0, 0, 0, 0.2 );
  backdrop-filter: blur( 8px );
  -webkit-backdrop-filter: blur( 8px );
`;

export const ExperienceHeader = styled.a`
  font-size: 1.6rem;
  font-weight: 400;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: .25rem;
  position: relative;

  & span {
    font-size: .875rem;
    font-weight: 300;
    font-style: italic; 
  }

  @media only screen and (max-width: 1199px) {
    font-size: 1.5rem;
  }
`;

export const ExperienceSub = styled.div`
  font-size: 1rem;
  font-style: italic;
  font-weight: 300;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 8px;
  background: rgba( 0, 0, 0, 0.2 );
  backdrop-filter: blur( 8px );
  -webkit-backdrop-filter: blur( 8px );
  padding: 2rem;
  box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.2);

  & p {
    font-weight: 300;
    font-style: normal;
    color: rgb(191 191 191);
  }
`;