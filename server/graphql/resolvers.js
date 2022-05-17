const { SkillModel } = require("../models/skill.model");
const JobModel = require("../models/job.model");

const resolvers = {
  Query: {
    getJobs: async () => {
      const jobs = await JobModel.find();
      return job;
    },
    getSkills: async () => {
      const skills = await SkillModel.find();
      return skills;
    },
  },
  Mutation: {
    createSkill: async (parents, args) => {
      const skill = await SkillModel.create({ name: args.name });
      return skill;
    },
    createJob: async (parents, args) => {
      const { company, title, skills } = args.input;
      const job = await JobModel.create({ company, title, skills });
      return job;
    },
  },
};

module.exports = resolvers;
