import styled from "styled-components"

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0.25rem;
  width: 50%;

  @media only screen and (max-width: 1199px) {
    width: 100%;
  }
`

export const HeaderH1 = styled.h1`
  width: 100%;
  line-height: 0.9;
  font-size: 6rem;
  cursor: pointer;
  transition: all 1s ease-in-out;
  font-weight: 600;
  &:hover {
    transform: scale(1.02);
  }
  @media only screen and (max-width: 1199px) {
    font-size: 4rem;
  }
`

export const SubWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0;
`

export const SubtitleText = styled.p`
  font-size: 1.2rem;
  line-height: 2;
  margin-top: 1rem;
  color: #999;
`
