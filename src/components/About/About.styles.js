import styled from "styled-components";

export const AboutContainer = styled.div`
  margin-top: 18.75rem;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 419px) {
    margin-top: 16.8rem;
  }
`;

export const FlexContainer = styled.div`
  margin-top: 1.8rem;
  display: flex;
  flex-direction: row;
  margin: 0 5rem;
  align-items: space-around;
  justify-content: space-around;
  @media only screen and (max-width: 1199px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 1rem;
  }
  @media only screen and (max-width: 419px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 1rem;
  }
`;

export const ImageWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
opacity: 0.8;
width: 45vh;
height: 45vh;
margin-left: 10rem;
@media only screen and (max-width: 1199px) {
    width: 35vh;
    height: 50%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: 0;
    margin-bottom: .5rem;
  }
  @media only screen and (max-width: 419px) {
    width: 25vh;
    height: 50%;
    justify-content: center;
    align-items: center;
    margin-left: 0;
    margin-bottom: .5rem;
  }

`;

export const DescWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
  @media only screen and (max-width: 1199px) {
    padding: 0 1.2rem;
    justify-content: center;
    align-items: center;
    width: 100vw;
  }
`;

export const AboutTitle = styled.h2`
  font-size: 2rem;
  color: #999;
  @media only screen and (max-width: 1199px) {
    font-size: 1.3rem;
    display: flex;
  }
  @media only screen and (max-width: 419px) {
    font-size: 1.2rem;
    display: flex;
  }
`;

export const AboutP = styled.p`
  margin: 1.2rem 1.9rem 0 0;
  font-size: 1rem;
  line-height: 1.7;
  color: #dddddd;
  @media only screen and (max-width: 1199px) {
    font-size: 0.9rem;
    margin: .2rem .6rem;
  }
`;

  export const Tech = styled.a`
  background: rgba( 255, 255, 255, 0.1 );
  backdrop-filter: blur( 1.5px );
  -webkit-backdrop-filter: blur( 1.5px );
  text-align: center;
  padding: 0.3rem;
  max-width: 150px;
  display: flex;
  border-radius: 12px 1px 12px 1px;
  font-size: 1rem;
  cursor: pointer;
  margin: 0.5rem 0;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: rgba( 0, 0, 0, 0.1 );
  }
  @media only screen and (max-width: 1199px) {
    font-size: 0.8rem;
  }
`;
