var jobs = {};

jobs.publish = require("./jobs/publish/index.js");
jobs.addConfigFile= require("./tasks/configFileAdd/index.js").start;
jobs.bumpVersion= require("./tasks/bumpVersion/index.js").start;

module.exports = jobs;
