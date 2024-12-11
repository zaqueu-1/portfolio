import styled from "styled-components";

export const FooterContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 2rem;
  flex-direction: column;
  justify-content: right;
  align-items: center;
  padding: 4rem;
  padding-bottom: 0;
`;

export const GoTop = styled.button`
  outline: none;
  background: none;
  border: none;
  color: #dddddd;
  cursor: pointer;
  font-size: 1rem;
  align-self: flex-end;
  transition: all 0.2s ease-in-out;
  &:hover {
    color: #999;
    transform: scale(1.05);
  }
  @media only screen and (max-width: 1199px) {
    font-size: .8rem;
  }
`;
;
