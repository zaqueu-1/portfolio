import styled from "styled-components";

export const AboutContainer = styled.div`
  max-width: 600px;
  min-width: 340px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin: 0 auto;
  height: 70vh;
`;

export const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0.9;
  width: 200px;
  height: 200px;
  position: relative;
  @media only screen and (max-width: 680px) {
    width: 120px;
    height: 120px;
  }
`;

export const DescWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  max-width: 1200px;
  min-width: 340px;
`;

export const AboutText = styled.p`
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.2;
  color: #dddddd;
  text-align: center;
  font-style: italic;
  & div {
      display: flex;
      flex-direction: column;
      margin-top: .5rem;
    }
  @media only screen and (max-width: 680px) {
    font-size: 0.9rem;
  }
`;
