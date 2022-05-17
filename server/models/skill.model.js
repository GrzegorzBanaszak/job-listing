const mongoose = require("mongoose");

const skillSchema = mongoose.Schema({
  name: String,
});

const SkillModel = mongoose.model("Skill", skillSchema);

module.exports = { skillSchema, SkillModel };
