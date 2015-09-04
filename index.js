var tasks = {};

// example
tasks.test = require("./tasks/test/index.js").start;
tasks.addConfigFile= require("./tasks/configFileAdd/index.js").start;
tasks.bumpVersion= require("./tasks/bumpVersion/index.js").start;
tasks.taskAdd= require("./tasks/taskAdd/index.js").start;

// automatically add tasks here
tasks.help = require("./tasks/help/index.js").start;
tasks.getCommonTasks = require("./tasks/getCommonTasks/index.js").start;
tasks.publish = require("./tasks/publish/index.js").start;
tasks.publishFolder = require("./tasks/publishFolder/index.js").start;
tasks.prompt = require("./tasks/prompt/index.js").start;
tasks.idea = require("./tasks/idea/index.js").start;
tasks.todo = require("./tasks/todo/index.js").start;

module.exports = tasks;
