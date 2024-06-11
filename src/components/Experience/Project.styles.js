import styled from "styled-components";

export const ProjectContainer = styled.div`
  display: flex;
  min-height: 40vh;
  width: 80vw;
  align-items: center;
  margin: .5rem 1.5rem;
  padding: .5rem 4rem;
  @media only screen and (max-width: 1199px) {
    flex-direction: column;
    padding: 0 .5rem;
    margin: 1rem auto;
    width: 90vw;
  }
`;

export const ImgWrapper = styled.div`
`;

export const ProjectImg = styled.img`
  width: 11.5vw;
  border-radius: 8px;
  transition: all 0.4s ease-in-out;
  cursor: pointer;
  opacity: 0.8;
  background: rgb( 255, 255, 255);
  &:hover {
    transform: scale(1.05);
    opacity: 1;
  }
  @media only screen and (max-width: 1199px) {
    width: 25vw;
  }
`;

export const ProjectInfo = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  @media only screen and (max-width: 1199px) {
    align-items: start;
    padding: .5rem;
  }
`;

export const Section = styled.div``;

export const ProjectHeader = styled.p`
  font-size: 2.2rem;
  font-weight: 400;
  @media only screen and (max-width: 1199px) {
    font-size: 1.7rem;
  }
  @media only screen and (max-width: 419px) {
    font-size: 1.2rem;
  }
`;

export const ProjectSub = styled.p`
  font-size: 1.2rem;
  font-weight: 300;
  @media only screen and (max-width: 1199px) {
    font-size: 1rem;
  }
`;

export const ProjectDescription = styled.span`
  font-size: 1rem;
  line-height: 1.7;
  font-weight: 300;
  color: #ddd;
  @media only screen and (max-width: 1199px) {
    font-size: 0.9rem;
    line-height: 1.5;
    margin-right: 1.8rem;
  }
`;

export const StackContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: .3rem;
  max-width: 90%;
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
    padding: 0.25rem 0.3rem;
  }
`;

export const LinkContainer = styled.div`
  margin-top: 1rem;
  @media only screen and (max-width: 1199px) {
    display: flex;
  }
`;

export const ExternalLink = styled.a` 
  margin-right: 0.4rem;
  font-size: 1rem;
  padding: .6rem;
  color: whitesmoke;
  display: flex;
  align-items: center;
  @media only screen and (max-width: 1199px) {
    font-size: 16px;
    margin-top: 10px;
    padding: 5px;
    text-align: center;
  }
`;

export const ELButton = styled.button` 
  padding: .6rem;
  transition: all 0.3s ease-in-out;
  border: none;
  background-color: transparent;
  &:hover {
    transform: scale(1.1);
  }
`;

export const Span = styled.span`
  font-size: 1.2rem;
  text-shadow: 2px 2px 5px #000000;
  @media only screen and (max-width: 1199px) {
    font-size: 1rem;
  }
`;
