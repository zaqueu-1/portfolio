import styled from "styled-components";

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 55vh;
  margin: 0 1rem;
  @media only screen and (max-width: 769px) {
    margin: 0 .5rem;
  }
`;

export const BoxSpacer = styled.div`
  align-content: center;
  justify-content: left;
`;

export const H1Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 4;
`;

export const HeaderH1 = styled.h1`
  width: 100%;
  line-height: 0.9;
  font-size: 5rem;
  cursor: pointer;
  transition: all 1s ease-in-out;
  margin: 15.6rem 0 0.3rem 0;
  &:hover {
    transform: scale(1.02);
  }
  @media only screen and (max-width: 450px) {
    font-size: 2.5rem;
  }
  @media only screen and (max-width: 900px) {
    font-size: 3.5rem;
  }
`;

export const SubtitleContainer = styled.div`
  flex: 5;
  align-items: center;
  justify-content: center;
`;

export const SubtitleText = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
  margin-left: 0.3rem;
  color: #999;
  @media only screen and (max-width: 370px) {
    font-size: 1rem;
  }
`;

export const Skill = styled.p`
  padding: 0.3rem 0.8rem;
  border-radius: 12px 1px 12px 1px;
  background: rgba( 255, 255, 255, 0.1 );
  backdrop-filter: blur( 1.5px );
  -webkit-backdrop-filter: blur( 1.5px );
  border: none;
  font-size: 1rem;
  cursor: pointer;
  margin: 0 0.25rem;
  justify-content: center;
  align-items: center;
  transition: 0.3s;
  &:hover {
    background-color: rgba( 0, 0, 0, 0.1 );
  }
  @media only screen and (max-width: 417px) {
    font-size: 12px;
    margin: 0.125rem 0.25rem;
  }
`;

export const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 0;
`;

export const InfoSpan = styled.span`
  font-size: 16px;
  color: grey;
  font-style: italic;
  @media only screen and (max-width: 370px) {
    font-size: 12px;
  }
`;


