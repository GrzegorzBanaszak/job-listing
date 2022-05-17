const { SkillModel } = require("../models/skill.model");
const JobModel = require("../models/job.model");

const resolvers = {
  Query: {
    getJobs: async () => {
      const jobs = await JobModel.find();
      return jobs;
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
      const { company, title, skills, image, location, workType } = args.input;
      const job = await JobModel.create({
        company,
        title,
        skills,
        image: process.env.IMAGE_URL + image,
        location,
        workType,
      });
      return job;
    },
  },
};

module.exports = resolvers;
