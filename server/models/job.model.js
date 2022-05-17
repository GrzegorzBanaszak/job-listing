const mongoose = require("mongoose");
const { skillSchema } = require("./skill.model");

const jobSchema = new mongoose.Schema(
  {
    company: String,
    title: String,
    skills: [skillSchema],
    image: String,
    location: String,
    workType: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Job", jobSchema);
