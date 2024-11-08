import styled from "styled-components";

export const AboutContainer = styled.div`
  margin: 20rem auto 0 auto;
  width: 100vw;
  max-width: 1200px;
  min-width: 320px;
  height: 100vh;
  max-height: 340px;
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  @media only screen and (max-width: 1199px) {
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
opacity: 0.85;
max-width: 300px;
max-height: 325px;
padding: 2rem;
width: 100%;
height: 100%;
position: relative;
@media only screen and (max-width: 1199px) {
  max-width: 200px;
  max-height: 215px;
}

`;

export const DescWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  max-width: 50vw;
  padding: 2rem .5rem;
  height: 40vh;
  @media only screen and (max-width: 1199px) {
    justify-content: center;
    align-items: center;
    width: 100vw;
    max-width: 100vw;
    text-align: center;
    padding: 0 2rem;
  }
`;

export const AboutTitle = styled.h2`
  font-size: 2rem;
  font-weight: 400;
  color: #999;
  @media only screen and (max-width: 1199px) {
    font-size: 1.3rem;
    display: flex;
  }
`;

export const AboutP = styled.p`
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.7;
  color: #dddddd;
  & div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    & a {
      text-decoration: underline;
      color: #dddddd;
      font-weight: 400;
      transition: all 0.3s ease-in-out;
      &:hover {
        color: #999;
      }
    }
  }
  @media only screen and (max-width: 1199px) {
    text-align: center;
    font-size: 0.9rem;
  }
`;

  export const Resume = styled.a`
  background: rgba( 255, 255, 255, 0.1 );
  backdrop-filter: blur( 1.5px );
  -webkit-backdrop-filter: blur( 1.5px );
  text-align: center;
  padding: .5rem .75rem;
  max-width: 210px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px 1px 12px 1px;
  font-size: 1rem;
  cursor: pointer;
  margin: 0.75rem 0;
  transition: all 0.3s ease-in-out;
  color: #dddddd;
  &:hover {
    background-color: rgba( 0, 0, 0, 0.1 );
  }
  @media only screen and (max-width: 1199px) {
    font-size: 0.9rem;
  }
`;
