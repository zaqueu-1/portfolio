import styled from "styled-components";

export const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  margin: 0 auto;
  width: 50%;
  gap: 2rem;

  @media only screen and (max-width: 1199px) {
    width: 100%;
  }
`;

export const AboutText = styled.p`
  font-size: 1.2rem;
  font-weight: 300;
  line-height: 1.8;
  color: rgb(191 191 191);
`;
