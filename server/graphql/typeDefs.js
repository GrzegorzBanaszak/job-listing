const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Job {
    id: ID
    company: String
    name: String
    skills: [Skill]
  }

  type Skill {
    id: ID
    name: String
  }

  type Query {
    getJobs: [Job]
  }
`;

module.exports = typeDefs;
