var jobs = {};

jobs.publish = require("./jobs/publish/index.js");
jobs.addConfigFile= require("./tasks/configFileAdd/index.js");

module.exports = jobs;
