import styled from "styled-components";

export const ContactContainer = styled.div`
  width: 100vw;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 1199px) {
    margin-top: 50px;
  }
`;

export const ContactTitle = styled.h2`
font-size: 2.5rem;
color: #999;
@media only screen and (max-width: 1199px) {
  font-size: 2rem;
  margin: 0 auto;
}
@media only screen and (max-width: 419px) {
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
@media only screen and (max-width: 1199px) {
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
width: 600px;
@media only screen and (max-width: 1199px) {
    font-size: 0.85rem;
    max-width: 600px;
    min-width: 300px;
    width: 100%;
  }
`;

export const ExternalLink = styled.a`
  font-size: 1.2rem;
  margin-top: .7rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  align-items: center;
  justify-content: center;
  display: flex;
  width: 100%;
  max-width: 900px;
  min-width: 300px;
  background: rgba( 255, 255, 255, 0.1 );
  backdrop-filter: blur( 1.5px );
  -webkit-backdrop-filter: blur( 1.5px );
  padding: 0.5rem 2rem;
  border-radius: 16px 0 16px 0;
  gap: .25rem;
  &:hover {
    background: rgba(0, 0, 0, 0.1);
    transform: scale(0.95);
  }
  @media only screen and (max-width: 1199px) {
    font-size: 0.85rem;
    max-width: 600px;
    min-width: 300px;
    width: 100%;
  }
`;

export const ContactSpan = styled.span`
  color: #f5f5f5;
  display: flex;
`;

export const ContactForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 650px;
    min-width: 330px;
    width: 100%;
    gap: 1rem;
    border: 2px solid transparent;
    padding: 1rem .5rem;
    margin-top: 1rem;
    background: rgba( 255, 255, 255, 0.1 );
    backdrop-filter: blur( 1.5px );
    -webkit-backdrop-filter: blur( 1.5px );
    border-radius: 18px 3px 18px 3px;
`;

export const FormInput = styled.input`
    border-radius: 8px;
    border: none;
    padding: .5rem;
    max-width: 600px;
    min-width: 300px;
    width: 100%;
    font-size: 1rem;
    color: white;
    background: rgba( 255, 255, 255, 0.025 );
    backdrop-filter: blur( 1.5px );
    -webkit-backdrop-filter: blur( 1.5px );
`;

export const FormArea = styled.textarea`
    border-radius: 8px;
    border: none;
    padding: .5rem;
    max-width: 600px;
    min-width: 300px;
    width: 100%;
    font-size: 1rem;
    color: white;
    background: rgba( 255, 255, 255, 0.1 );
    backdrop-filter: blur( 1.5px );
    -webkit-backdrop-filter: blur( 1.5px );
    height: 200px;
`;

export const SubmitForm = styled.button`
    max-width: 600px;
    min-width: 300px;
    width: 100%;
    cursor: pointer;
    height: 30px;
    transition: all 0.3s ease-in-out;
    background: rgba( 255, 255, 255, 0.1 );
    backdrop-filter: blur( 1.5px );
    -webkit-backdrop-filter: blur( 1.5px );
    border: none;
    color: white;
    &:hover {
      background: rgba( 255, 255, 255, 0.4 );
    }
`









