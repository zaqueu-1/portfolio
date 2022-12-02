import styled from "styled-components";

export const ContactContainer = styled.div`
  width: 100vw;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  @media only screen and (max-width: 900px) {
    margin-top: 50px;
  }
`;

export const ContactH1 = styled.h2`
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

export const FlexContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media only screen and (max-width: 900px) {
    flex-direction: column-reverse;
  }
`;

export const ContactP = styled.p`
  margin: .6rem 0;
  font-size: 1rem;
  line-height: 1.7;
`;

export const ContactWrapper = styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content: flex-start;
margin-bottom: 0.5rem;
transition: all 0.3s ease-in-out;
&:hover {
  color: rgba( 0, 0, 0, 0.1 );
  transform: scale(1.05);
}
`;

export const ExternalLink = styled.a`
  font-size: 1.2rem;
  margin-right: .4rem;
  cursor: pointer;
  transition: 0.3s;
  color: #999;
  transition: all 0.3s ease-in-out;
  &:hover {
    color: rgba( 0, 0, 0, 0.1 );
    transform: scale(1.05);
  }
  @media only screen and (max-width: 700px) {
    font-size: 0.9rem;
  }
`;

export const IconWrapper = styled.div`
  color: #f5f5f5;
  margin-right: 0.2rem
`;

export const ContactSpan = styled.span`
  font-size: 1rem;
  color: #f5f5f5;
`;










