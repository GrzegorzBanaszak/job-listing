import React from "react";
import styled from "styled-components";
import Job from "./Job";

const Container = styled.section`
  margin: 3rem 1rem;
`;

const List = () => {
  return (
    <Container>
      <Job />
    </Container>
  );
};

export default List;
