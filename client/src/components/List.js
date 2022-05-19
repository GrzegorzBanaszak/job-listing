import React from "react";
import styled from "styled-components";
import Job from "./Job";

const Container = styled.section`
  margin: 5rem 1rem;
  max-width: 1200px;
  @media (min-width: 1440px) {
    margin: 5rem auto;
  }
`;

const List = ({ data, applyFilter }) => {
  return (
    <Container>
      {data.map((job) => (
        <Job key={job.id} job={job} applyFilter={applyFilter} />
      ))}
    </Container>
  );
};

export default List;
