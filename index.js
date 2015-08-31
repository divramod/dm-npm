var tasks = {};

// example
tasks.test = require("./tasks/test/index.js").start;
tasks.publish = require("./jobs/publish/index.js");
tasks.addConfigFile= require("./tasks/configFileAdd/index.js").start;
tasks.bumpVersion= require("./tasks/bumpVersion/index.js").start;

// automatically add tasks here
tasks.publishFolder = require("./tasks/publishFolder/index.js").start;
tasks.publishFolder = require("./tasks/publishFolder/index.js").start;
tasks.prompt = require("./tasks/prompt/index.js").start;
tasks.idea = require("./tasks/idea/index.js").start;
tasks.todo = require("./tasks/todo/index.js").start;

module.exports = tasks;
