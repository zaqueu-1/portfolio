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
  color: #999;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s ease-in-out;
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  &:hover {
    color: #ddd;
    transform: scale(1.05);
  }
  @media only screen and (max-width: 1199px) {
    font-size: .8rem;
  }
`;
