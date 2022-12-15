import styled from "styled-components";

export const ContactContainer = styled.div`
  width: 100vw;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 900px) {
    margin-top: 50px;
  }
`;

export const ContactTitle = styled.h2`
font-size: 2.5rem;
color: #999;
@media only screen and (max-width: 900px) {
  font-size: 2rem;
  margin: 0 auto;
}
@media only screen and (max-width: 417px) {
  font-size: 1.5rem;
  margin: 0 auto;
}
`;

export const ContactSub = styled.h2`
font-size: 1.2rem;
margin: 0.5rem;
padding: 0.2rem;
text-align: center;
color: #f5f5f5;
@media only screen and (max-width: 900px) {
  font-size: 0.9rem;
}
`;

export const FlexContainer = styled.div`
  margin-top: .5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ContactWrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;

export const ExternalLink = styled.a`
  font-size: 1.2rem;
  margin-top: .7rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  align-items: center;
  justify-content: center;
  display: flex;
  min-width: 35vw;
  max-width: 35vw;
  background: rgba( 255, 255, 255, 0.1 );
  backdrop-filter: blur( 1.5px );
  -webkit-backdrop-filter: blur( 1.5px );
  padding: 0.5rem 1rem;
  border-radius: 16px 0 16px 0;
  &:hover {
    background: rgba(0, 0, 0, 0.1);
    transform: scale(0.95);
  }
  @media only screen and (max-width: 900px) {
    font-size: 0.85rem;
    min-width: 70vw;
    max-width: 70vw;
  }
`;

export const IconWrapper = styled.div`
  color: #f5f5f5;
  margin-right: 0.5rem;
  display: flex;
`;

export const ContactSpan = styled.span`
  color: #f5f5f5;
  display: flex;
`;










