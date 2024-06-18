import styled from "styled-components";

export const ContactContainer = styled.div`
  width: 100vw;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 6.5rem;
  @media only screen and (max-width: 419px) {
    margin-top: 8.5rem;
    padding: 1.5rem;
    font-size: 1.5rem;
    margin: 2rem auto;
  }
`;

export const ContactTitle = styled.h2`
  font-size: 2.5rem;
  color: #999;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: .35rem;
  @media only screen and (max-width: 1199px) {
    font-size: 2rem;
    margin: 2rem auto;
  }
  @media only screen and (max-width: 419px) {
    font-size: 1.5rem;
    margin: 2rem auto;
  }
`;

export const ContactForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 900px;
    min-width: 300px;
    width: 100%;
    gap: 1rem;
    border: 2px solid transparent;
    padding: 1rem;
    backdrop-filter: blur( 1.5px );
    -webkit-backdrop-filter: blur( 1.5px );
    border-radius: 16px;
`;

export const SocialContainer = styled.div`
  margin-top: .5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;


export const ContactWrapper = styled.div`
display: flex;
gap: .5rem;
align-items: center;
justify-content: center;
width: 100%;
max-width: 800px;
border-radius: 8px;
@media only screen and (max-width: 600px) {
    font-size: 0.85rem;
    max-width: 550px;
    min-width: 300px;
    width: 100%;
    flex-direction: column;
  }
`;

export const ExternalLink = styled.a`
  font-size: 1.2rem;
  font-weight: 300;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  align-items: center;
  justify-content: center;
  display: flex;
  padding: 0.5rem 2rem;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.1);
  gap: .35rem;
  &:hover {
    transform: scale(0.95);
  }
  @media only screen and (max-width: 1199px) {
    font-size: 0.85rem;
  }
`;

export const ContactSpan = styled.span`
  color: #f5f5f5;
  display: flex;
`;

export const FormInput = styled.input`
    border-radius: 8px;
    border: none;
    padding: .5rem;
    max-width: 900px;
    min-width: 300px;
    width: 100%;
    font-size: 1rem;
    color: white;
    background: rgba( 255, 255, 255, 0.15 );
    backdrop-filter: blur( 1.5px );
    -webkit-backdrop-filter: blur( 1.5px );
`;

export const FormArea = styled.textarea`
    border-radius: 8px;
    border: none;
    padding: .5rem;
    max-width: 900px;
    min-width: 300px;
    width: 100%;
    font-size: 1rem;
    color: white;
    background: rgba( 255, 255, 255, 0.15 );
    backdrop-filter: blur( 1.5px );
    -webkit-backdrop-filter: blur( 1.5px );
    height: 200px;
`;

export const SubmitForm = styled.button`
    max-width: 900px;
    min-width: 300px;
    width: 100%;
    cursor: pointer;
    height: 30px;
    transition: all 0.3s ease-in-out;
    background: rgba( 255, 255, 255, 0.15 );
    backdrop-filter: blur( 1.5px );
    -webkit-backdrop-filter: blur( 1.5px );
    border: none;
    border-radius: 8px;
    color: white;
    &:hover {
      background: rgba( 255, 255, 255, 0.4 );
    }
`









