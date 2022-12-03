import styled from "styled-components";

export const FooterContainer = styled.div`
  margin: 50px 0 20px 0;
  display: flex;
  justify-content: right;
  align-items: center;
`;

export const GoToTop = styled.button`
  outline: none;
  background: none;
  border: none;
  color: #dddddd;
  cursor: pointer;
  margin-right: 1.2rem;
  font-size: 1rem;
  transition: all 0.2s ease-in-out;
  &:hover {
    color: #999;
    transform: scale(1.05);
  }
  @media only screen and (max-width: 700px) {
    font-size: .8rem;
  }
`;
;
