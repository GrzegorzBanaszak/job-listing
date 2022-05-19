import React from "react";
import styled from "styled-components";
import Job from "./Job";

const Container = styled.section`
  margin: 4rem 1rem;
  padding-top: ${({ applayMargin }) =>
    applayMargin > 0 ? applayMargin * 0.7 + "rem" : "0.5rem"};
  max-width: 1200px;
  @media (min-width: 1440px) {
    margin: 5rem auto;
    padding-top: 0;
  }
`;

const List = ({ data, applyFilter, filterLength }) => {
  return (
    <Container applayMargin={filterLength}>
      {data.map((job) => (
        <Job key={job.id} job={job} applyFilter={applyFilter} />
      ))}
    </Container>
  );
};

export default List;
