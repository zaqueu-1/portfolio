import styled from "styled-components";

export const ContactContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "Poppins", sans-serif;
  @media only screen and (max-width: 1199px) {
    font-size: 1.5rem;
  }
`;

export const ContactForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 600px;
    min-width: 320px;
    width: 100%;
    padding: 2rem;
    gap: 1rem;
    border: 2px solid transparent;
    backdrop-filter: blur( 8px );
    -webkit-backdrop-filter: blur( 8px );
    border-radius: 16px;
`;

export const FormInput = styled.input`
    border-radius: 8px;
    border: 1px solid #222;
    padding: .5rem;
    min-width: 300px;
    width: 100%;
    font-size: 1rem;
    color: white;
    background: rgba( 0, 0, 0, 0.1 );
    backdrop-filter: blur( 8px );
    -webkit-backdrop-filter: blur( 8px );
    ::placeholder {
      color: white;
      opacity: .5;
      font-style: italic;
    }
`;

export const FormArea = styled.textarea`
    border-radius: 8px;
    border: 1px solid #222;
    padding: .5rem;
    min-width: 300px;
    width: 100%;
    font-size: 1rem;
    color: white;
    background: rgba( 0, 0, 0, 0.1 );
    backdrop-filter: blur( 8px );
    -webkit-backdrop-filter: blur( 8px );
    height: 200px;
    ::placeholder {
      color: white;
      opacity: .5;
      font-style: italic;
    }
`;

export const SubmitForm = styled.button`
    min-width: 300px;
    width: 100%;
    cursor: pointer;
    height: 30px;
    transition: all 0.3s ease-in-out;
    background: rgba( 0, 0, 0, 0.1 );
    backdrop-filter: blur( 8px );
    -webkit-backdrop-filter: blur( 8px );
    border: 1px solid #222;
    border-radius: 4px;
    color: white;
    font-size: 1rem;
    font-weight: 500;
`









