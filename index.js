var tasks = {};


// automatically add tasks here
tasks.configGet = require("./tasks/configGet/index.js").start;
tasks.configEdit = require("./tasks/configEdit/index.js").start;
tasks.test = require("./tasks/test/index.js").start;
tasks.configAdd = require("./tasks/configAdd/index.js").start;
tasks.configLink = require("./tasks/configLink/index.js").start;
tasks.bumpVersion = require("./tasks/bumpVersion/index.js").start;
tasks.taskAdd = require("./tasks/taskAdd/index.js").start;
tasks.help = require("./tasks/help/index.js").start;
tasks.getCommonTasks = require("./tasks/getCommonTasks/index.js").start;
tasks.publish = require("./tasks/publish/index.js").start;
tasks.publishFolder = require("./tasks/publishFolder/index.js").start;
tasks.prompt = require("./tasks/prompt/index.js").start;
tasks.idea = require("./tasks/idea/index.js").start;
tasks.todo = require("./tasks/todo/index.js").start;
tasks.linkLocal = require("./tasks/linkLocal/index.js").start;
tasks.linkGlobal = require("./tasks/linkGlobal/index.js").start;

module.exports = tasks;
