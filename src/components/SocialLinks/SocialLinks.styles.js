import styled from "styled-components";

export const LinksContainer = styled.div`
  display: flex;
  gap: .5rem;
  align-items: center;
  justify-content: flex-start;
  border-radius: 8px;
  padding: 0;
  width: 100%;
`;

export const ExternalLink = styled.a`
  font-size: 1.5rem;
  font-weight: 300;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  align-items: center;
  justify-content: center;
  display: flex;
  padding: .5rem;
  border-radius: 8px;
  color: #dddddd;
  &:hover {
    transform: scale(1.05);
  }
`;









