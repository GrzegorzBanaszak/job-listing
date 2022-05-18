const { SkillModel } = require("../models/skill.model");
const JobModel = require("../models/job.model");

const resolvers = {
  Query: {
    getJobs: async () => {
      const jobs = await JobModel.find();
      const filtredJobs = jobs.map((job) => {
        return {
          company: job.company,
          title: job.title,
          image: job.image,
          location: job.location,
          workType: job.workType,
          skills: job.skills,
          createdAt: job.createdAt.toISOString(),
        };
      });

      return filtredJobs;
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
        image,
        location,
        workType,
      });
      return job;
    },
  },
};

module.exports = resolvers;
