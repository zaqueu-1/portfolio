import styled from "styled-components";

export const AboutContainer = styled.div`
  margin-top: 18.75rem;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  @media only screen and (max-width: 900px) {
    justify-content: center;
  }
  @media only screen and (max-width: 416px) {
    justify-content: center;
    margin-top: 16.8rem;
  }
`;

export const FlexContainer = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  padding: 0 6rem;
  @media only screen and (max-width: 900px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 1rem;
  }
  @media only screen and (max-width: 416px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 1.5rem;
  }
`;

export const ImageWrapper = styled.div`
display: flex;
justify-content: flex-end;
align-items: flex-end;
opacity: 0.8;
width: 45vh;
height: 45vh;
margin-left: 8rem;
@media only screen and (max-width: 900px) {
    width: 35vh;
    height: 50%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: 0;
    margin-bottom: .5rem;
  }
  @media only screen and (max-width: 416px) {
    width: 25vh;
    height: 50%;
    justify-content: center;
    align-items: center;
    margin-left: 0;
    margin-bottom: .5rem;
  }

`;

export const DescWrapper = styled.div`
  flex: 5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem 0 0 4rem;
  @media only screen and (max-width: 900px) {
    padding: 0 1.2rem;
    justify-content: center;
    align-items: center;
  }
  @media only screen and (max-width: 416px) {
    padding: 0 1rem;
    justify-content: center;
    align-items: center;
  }
`;

export const AboutTitle = styled.h2`
  font-size: 2rem;
  color: #999;
  @media only screen and (max-width: 900px) {
    font-size: 1.5rem;
  }
  @media only screen and (max-width: 416px) {
    font-size: 1.5rem;
  }
`;

export const AboutP = styled.p`
  margin: 1.2rem 1.9rem 0 0;
  font-size: 1rem;
  line-height: 1.7;
  color: #dddddd;
  @media only screen and (max-width: 900px) {
    margin: .6rem 0;
  }
  @media only screen and (max-width: 416px) {
    margin: .6rem 0;
  }
`;
