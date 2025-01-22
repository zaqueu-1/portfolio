import styled from "styled-components";

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: .25rem;
  height: 95vh;
`;

export const HeaderWrapper = styled.div`
  display: flex;
`;

export const HeaderH1 = styled.h1`
  width: 100%;
  line-height: 0.9;
  font-size: 5rem;
  cursor: pointer;
  transition: all 1s ease-in-out;
  font-weight: 400;
  &:hover {
    transform: scale(1.02);
  }
  @media only screen and (max-width: 1199px) {
    font-size: 3rem;
  }
  @media only screen and (max-width: 680px) {
    font-size: 2rem;
  }
`;

export const SubWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0;
`;

export const SubtitleText = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
  color: #999;
  @media only screen and (max-width: 680px) {
    font-size: 1rem;
  }
`;

export const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 500px;
  gap: .5rem;
  @media only screen and (max-width: 680px) {
    gap: .25rem;
  }
`;

export const Skill = styled.p`
  padding: 0.3rem 0.8rem;
  border-radius: 12px 1px 12px 1px;
  background: rgba( 0, 0, 0, 0.1 );
  backdrop-filter: blur( 8px );
  -webkit-backdrop-filter: blur( 8px );
  border: 1px solid #222;
  font-size: 1rem;
  cursor: pointer;
  margin: 0;
  justify-content: center;
  align-items: center;
  transition: 0.3s;
  @media only screen and (max-width: 680px) {
    font-size: .7rem;
  }
`;

export const InfoSpan = styled.span`
  font-size: 16px;
  color: grey;
  font-style: italic;
  @media only screen and (max-width: 680px) {
    font-size: .7rem;
  }
`;


