import styled from "styled-components";

export const ProjectContainer = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.id % 2 !== 0 ? "row" : "row-reverse")};
  min-height: 70vh;
  align-items: center;
  margin: 0 1rem;
  @media only screen and (max-width: 900px) {
    flex-direction: column;
    padding: 0 1rem;
  }
  @media only screen and (max-width: 416px) {
    flex-direction: column;
    padding: 0 1rem;
  }
`;

export const ImgWrapper = styled.div``;

export const ProjectImg = styled.img`
  width: 50vw;
  transition: all 0.4s ease-in-out;
  cursor: pointer;
  opacity: 0.8;
  &:hover {
    transform: scale(1.05);
    opacity: 1;
  }
  @media only screen and (max-width: 900px) {
    width: 100%;
  }
`;

export const ProjectInfo = styled.div`
  margin: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  @media only screen and (max-width: 900px) {
    margin: 0 0 0 1.2rem;
    align-items: start;
  }
`;

export const Section = styled.div``;

export const ProjectH1 = styled.h1`
  font-size: 3rem;
  @media only screen and (max-width: 900px) {
    font-size: 2rem;
  }
`;

export const ProjectDescription = styled.p`
  font-size: 1rem;
  line-height: 1.7;
  color: #ddd;
  @media only screen and (max-width: 900px) {
    font-size: 16px;
    line-height: 1.5;
    margin-right: 30px;
  }
`;

export const StackContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const Tech = styled.span`
  background: rgba( 255, 255, 255, 0.1 );
  backdrop-filter: blur( 1.5px );
  -webkit-backdrop-filter: blur( 1.5px );
  border: none;
  padding: 0.3rem 0.8rem;
  border-radius: 12px 1px 12px 1px;
  font-size: 16px;
  cursor: pointer;
  margin: 1px 4px;
  transition: 0.3s;
  &:hover {
    background-color: rgba( 0, 0, 0, 0.1 );
  }
  @media only screen and (max-width: 900px) {
    font-size: 0.8rem;
    padding: 0.25rem; 0.3rem;
  }
`;

export const LinkContainer = styled.div`
  margin-top: 1rem;
  @media only screen and (max-width: 900px) {
    display: flex;
  }
`;

export const ExternalLink = styled.a` 
  margin-right: 0.4rem;
  font-size: 1rem;
  padding: .6rem;
  @media only screen and (max-width: 900px) {
    font-size: 16px;
    margin-top: 10px;
    padding: 5px;
    text-align: center;
  }
`;

export const Span = styled.span`
  font-size: 1.2rem;
  text-shadow: 2px 2px 5px #000000;
  @media only screen and (max-width: 900px) {
    font-size: 1rem;
  }
`;
