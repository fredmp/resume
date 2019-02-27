const general = require('./general');
const companies = require('./companies');
const education = require('./education');
const projects = require('./projects');
const skillsetGroups = require('./skillset-groups');

const data = {
  ...general,
  companies,
  education,
  projects,
  skillsetGroups,
};

module.exports = data;
