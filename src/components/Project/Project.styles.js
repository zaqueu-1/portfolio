import styled from "styled-components";

export const ProjectContainer = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.id % 2 !== 0 ? "row" : "row-reverse")};
  min-height: 55vh;
  align-items: center;
  margin: .5rem 1.5rem;
  padding: .5rem 4rem;
  @media only screen and (max-width: 1199px) {
    flex-direction: column;
    padding: 0 .5rem;
    width: 100vw;
    margin: .5rem auto;
  }
`;

export const ImgWrapper = styled.div`
`;

export const ProjectImg = styled.img`
  width: 32.5vw;
  border-radius: 8px;
  transition: all 0.4s ease-in-out;
  cursor: pointer;
  opacity: 0.8;
  &:hover {
    transform: scale(1.05);
    opacity: 1;
  }
  @media only screen and (max-width: 1199px) {
    width: 80vw;
  }
`;

export const ProjectInfo = styled.div`
  margin: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  @media only screen and (max-width: 1199px) {
    align-items: start;
    margin-top: 0;
  }
`;

export const Section = styled.div``;

export const ProjectH1 = styled.h1`
  font-size: 2.2rem;
  font-weight: 400;
  @media only screen and (max-width: 1199px) {
    font-size: 1.7rem;
  }
  @media only screen and (max-width: 419px) {
    font-size: 1.2rem;
  }
`;

export const ProjectDescription = styled.p`
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
  max-width: 90%;
`;

export const Tech = styled.span`
  background: rgba( 255, 255, 255, 0.1 );
  backdrop-filter: blur( 1.5px );
  -webkit-backdrop-filter: blur( 1.5px );
  padding: 0.3rem 0.8rem;
  border-radius: 12px 1px 12px 1px;
  font-size: 16px;
  cursor: pointer;
  margin: 3px;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: rgba( 0, 0, 0, 0.1 );
  }
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
