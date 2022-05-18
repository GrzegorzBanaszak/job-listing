import { gql } from "@apollo/client";

export const QUERY_ALL_JOBS = gql`
  query GetJobs {
    getJobs {
      id
      company
      title
      image
      location
      workType
      createdAt
      skills {
        id
        name
      }
    }
  }
`;

export const QUERY_ALL_SKILLS = gql`
  query GetSkills {
    getSkills {
      id
      name
    }
  }
`;

export const CREATE_JOB = gql`
  mutation CreateTask($input: CreateJobInput) {
    createTask(input: $input) {
      id
      company
      title
      image
      location
      workType
      createdAt
      skills {
        id
        name
      }
    }
  }
`;
