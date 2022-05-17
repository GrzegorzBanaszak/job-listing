const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Job {
    id: ID
    company: String
    title: String
    skills: [Skill]
  }

  type Skill {
    id: ID
    name: String
  }

  type Query {
    getJobs: [Job]
    getSkills: [Skill]
  }

  type Mutation {
    createSkill(name: String): Skill
  }
`;

module.exports = typeDefs;
