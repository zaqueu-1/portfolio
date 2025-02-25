import styled from "styled-components";

export const ContactContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "Poppins", sans-serif;
`;

export const ContactForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 600px;
    min-width: 320px;
    width: 100%;
    gap: 1rem;
    border: 2px solid transparent;
    border-radius: 16px;
`;

export const FormInput = styled.input`
    border-radius: 8px;
    min-width: 300px;
    width: 100%;
    font-size: 1rem;
    color: white;
    border-radius: 8px;
    border: 1px solid transparent;
    background: rgba( 0, 0, 0, 0.2 );
    backdrop-filter: blur( 8px );
    -webkit-backdrop-filter: blur( 8px );
    padding: 1rem;
    box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.2);
    ::placeholder {
      color: white;
      opacity: .5;
      font-style: italic;
    }
`;

export const FormArea = styled.textarea`
    border-radius: 8px;
    border: 1px solid transparent;
    min-width: 300px;
    width: 100%;
    font-size: 1rem;
    color: white;
    background: rgba( 0, 0, 0, 0.1 );
    height: 200px;
    border-radius: 8px;
    background: rgba( 0, 0, 0, 0.2 );
    backdrop-filter: blur( 8px );
    -webkit-backdrop-filter: blur( 8px );
    padding: 1rem;
    box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.2);
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
    transition: all 0.3s ease-in-out;
    background: rgba( 0, 0, 0, 0.1 );
    border: 1px solid transparent;
    border-radius: 4px;
    color: white;
    font-size: 1rem;
    font-weight: 500;
    border-radius: 8px;
    background: rgba( 0, 0, 0, 0.2 );
    backdrop-filter: blur( 8px );
    -webkit-backdrop-filter: blur( 8px );
    padding: 1rem;
    box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.2);
`









