import React from "react";
import styled from "styled-components";

const Container = styled.article`
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  padding: 2.4rem 1rem;

  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

const Image = styled.img`
  position: absolute;
  width: 4rem;
  height: 4rem;
  top: -2rem;
  left: 1rem;
`;

const Company = styled.h3`
  margin: 0.7rem 0 1rem 0;
  display: flex;
  align-items: center;
`;

const Info = styled.span`
  color: white;
  background: ${(props) => props.bgColor};
  border-radius: 20px;
  padding: 0.4rem 0.5rem;
  font-size: 0.9rem;
  margin-left: 0.7rem;
  text-transform: uppercase;
`;

const Title = styled.h3`
  margin-bottom: 0.4rem;
  color: black;
`;

const InfoList = styled.ul`
  display: flex;
  gap: 2rem;
  li:first-child {
    list-style: none;
  }
`;

const SkillsList = styled.ul`
  margin-top: 0.7rem;
  padding: 0.7rem 0;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  border-top: 1px solid hsl(180, 29%, 50%);
  list-style-type: none;
`;

const Skill = styled.li`
  color: hsl(180, 8%, 52%);
  font-weight: 700;
  font-size: 1.1rem;
  background-color: #e4e8e8;
  padding: 0.4rem;
`;
const Job = () => {
  return (
    <Container>
      <Image src="http://localhost:4000/account.svg" alt="jobLogo" />
      <Company>
        Photosnack <Info bgColor="hsl(180, 8%, 52%)">New!</Info>
        <Info bgColor="hsl(180, 14%, 20%)">Featured</Info>
      </Company>
      <Title>Senior Frontend Developer</Title>
      <InfoList>
        <li>1d ago</li>
        <li>Full time</li>
        <li>USA only</li>
      </InfoList>
      <SkillsList>
        <Skill>HTML</Skill>
        <Skill>HTML</Skill>
      </SkillsList>
    </Container>
  );
};

export default Job;
