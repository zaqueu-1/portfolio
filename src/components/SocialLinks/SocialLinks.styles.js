import styled from "styled-components";

export const LinksContainer = styled.div`
display: flex;
flex-direction: column;
gap: .5rem;
align-items: center;
justify-content: center;
width: 60px;
border-radius: 8px;
position: absolute;
right: 92.5%;
@media only screen and (max-width: 1199px) {
  right: 82.5%;
  gap: .7rem;
}

`;

export const ExternalLink = styled.a`
  font-size: 1.1rem;
  font-weight: 300;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  align-items: center;
  justify-content: center;
  display: flex;
  padding: .5rem 1rem;
  border-radius: 8px;
  background: rgba( 255, 255, 255, 0.1 );
  backdrop-filter: blur( 1.5px );
  -webkit-backdrop-filter: blur( 1.5px );
  color: #dddddd;
  &:hover {
    transform: scale(1.05);
    background-color: rgba( 0, 0, 0, 0.1 );
  }
  @media only screen and (max-width: 1199px) {
    font-size: .9rem;
    padding: .35rem .75rem;
  }
`;









