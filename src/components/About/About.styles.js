import styled from "styled-components";

export const AboutContainer = styled.div`
  margin-top: 18.75rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: space-around;
  padding: 0 2rem;

  @keyframes float {
    0% {
      transform: translateY(0px);
      }
    50% {
      transform: translateY(5px);
      }
    100% {
      transform: translateY(0px);
      }
    
  }

  @media only screen and (max-width: 419px) {
    margin-top: 16.8rem;
  }
`;

export const FlexContainer = styled.div`
  margin-top: 1.8rem;
  display: flex;
  flex-direction: row;
  margin: 0 4rem;
  align-items: center;
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
flex-direction: column;
justify-content: center;
align-items: center;
opacity: 0.8;
width: 42vh;
height: 42vh;
margin-left: 3rem;

div a {
  transition: all 0.3s ease-in-out;
}

div a:hover {
  transform: scale(1.05);
  color: rgba( 0, 0, 0, 0.4 );
}

div a .icon {
  font-size: 1.5rem;
}

@media only screen and (max-width: 1199px) {
    width: 32.5vh;
    height: 50%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: 0;
    margin-bottom: 1rem;
  }
  @media only screen and (max-width: 419px) {
    width: 20vh;
    height: 50%;
    justify-content: center;
    align-items: center;
    margin-left: 0;
    margin-bottom: 1rem;

    div a .icon {
      font-size: 1.2rem;
    }
  }

`;

export const DescWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 50vw;
  padding: 0 2rem;
  @media only screen and (max-width: 1199px) {
    padding: 0 1.5rem;
    justify-content: center;
    align-items: center;
    width: 100vw;
    max-width: 100vw;
    text-align: center;
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
  @media only screen and (max-width: 419px) {
    font-size: 1.2rem;
    display: flex;
  }
`;

export const AboutP = styled.p`
  margin: 1.2rem 1.9rem 0 0;
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
  @media only screen and (max-width: 600px) {
    font-size: 0.9rem;
    margin: .5rem .6rem;
    text-align: center;
  }
`;

  export const Tech = styled.a`
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
  &:hover {
    background-color: rgba( 0, 0, 0, 0.1 );
  }
  @media only screen and (max-width: 1199px) {
    font-size: 0.9rem;
  }
`;
