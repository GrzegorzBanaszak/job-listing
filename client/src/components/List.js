import React from "react";
import styled from "styled-components";
import Job from "./Job";

const Container = styled.section`
  margin: 3rem 1rem;
  max-width: 1200px;
  @media (min-width: 1440px) {
    margin: 3rem auto;
  }
`;

const List = ({ data }) => {
  return (
    <Container>
      {data.map((job) => (
        <Job key={job.id} job={job} />
      ))}
    </Container>
  );
};

export default List;
