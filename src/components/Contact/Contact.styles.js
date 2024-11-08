import styled from "styled-components";

export const ContactContainer = styled.div`
  width: 100vw;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 6.5rem;
  font-family: "Poppins", sans-serif;
  @media only screen and (max-width: 1199px) {
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
  }
`;

export const ContactForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 1200px;
    min-width: 320px;
    width: 70%;
    padding: 2rem;
    gap: 1rem;
    border: 2px solid transparent;
    backdrop-filter: blur( 1.5px );
    -webkit-backdrop-filter: blur( 1.5px );
    border-radius: 16px;
`;

export const FormInput = styled.input`
    border-radius: 8px;
    border: none;
    padding: .5rem;
    width: 100%;
    min-width: 300px;
    font-size: 1rem;
    color: white;
    background: rgba( 255, 255, 255, 0.15 );
    backdrop-filter: blur( 1.5px );
    -webkit-backdrop-filter: blur( 1.5px );
    ::placeholder {
      color: white;
      opacity: .5;
      font-style: italic;
    }
`;

export const FormArea = styled.textarea`
    border-radius: 8px;
    border: none;
    padding: .5rem;
    width: 100%;
    min-width: 300px;
    font-size: 1rem;
    color: white;
    background: rgba( 255, 255, 255, 0.15 );
    backdrop-filter: blur( 1.5px );
    -webkit-backdrop-filter: blur( 1.5px );
    height: 200px;
    ::placeholder {
      color: white;
      opacity: .5;
      font-style: italic;
    }
`;

export const SubmitForm = styled.button`
    width: 45%;
    min-width: 300px;
    cursor: pointer;
    height: 30px;
    transition: all 0.3s ease-in-out;
    background: rgba( 255, 255, 255, 0.15 );
    backdrop-filter: blur( 1.5px );
    -webkit-backdrop-filter: blur( 1.5px );
    border: none;
    border-radius: 4px;
    color: white;
    font-size: 1rem;
    font-weight: 500;
    &:hover {
      background-color: rgba( 0, 0, 0, 0.1 );
    }
`









