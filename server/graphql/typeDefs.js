const { gql } = require("apollo-server-express");
const typeDefs = gql`
  type Job {
    id: ID
    company: String
    title: String
    skills: [Skill]
    image: String
    location: String
    workType: String
    createdAt: String
  }

  type Skill {
    id: ID
    name: String
  }

  type Query {
    getJobs: [Job]
    getSkills: [Skill]
  }
  input SkillInput {
    name: String
  }
  input CreateJobInput {
    company: String
    title: String
    image: String
    location: String
    workType: String
    skills: [SkillInput]
  }

  type Mutation {
    createSkill(name: String): Skill
    createJob(input: CreateJobInput): Job
  }
`;

module.exports = typeDefs;
