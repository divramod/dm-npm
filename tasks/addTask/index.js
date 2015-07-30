// =========== [ REQUIRE ] ===========
var co = require("co");
var colors = require("colors");
var dmPrompt = require("dm-prompt").Inquirer;
var dmUtil = require("dm-util");
require("shelljs/global");

// =========== [ MODULE DEFINE ] ===========
var job = {};

// =========== [ job.start() ] ===========
// TODO
job.start = co.wrap(function*() {
    try {

        // ask for task name
        var taskNameAnswer =
            yield dmPrompt({
                type: "input",
                name: "taskName",
                message: "Please enter the Task Name:"
            });
        var taskName = taskNameAnswer.taskName;

        // get possible task pathes (all folders under modules and top level tasks)
        var possiblePathes = [];
        if (test("-d", "modules")) {
            var possiblePathes = ls("modules");
        }
        possiblePathes.push("tasks");

        // ask for task path and adapt it
        var taskPathAnswer =
            yield dmPrompt({
                type: "list",
                name: "taskPath",
                message: "Please choose the path for the task:",
                choices: possiblePathes
            });
        var taskPath = taskPathAnswer.taskPath;
        if (taskPath !== "tasks") {
            taskPath = "modules/" + taskPath + "/tasks/" + taskName;
        }
        taskPath = process.cwd() + '/' + taskPath;
        console.log(taskPath);

        // create task
        var configTask = {
            templatePath: __dirname + '/templates',
            targetPath: taskPath,
            deleteBefore: true,
            overwrite: true, // [true, false, "ask"]
            rename: ["files", "dirs"], // renames
            replace: [{
                search: "TASKNAME",
                replace: taskName
            }],
            messages: {
                success: "Task " + taskName + " created!",
                error: "Task " + taskName + " not created!"
            }
        };
        dmUtil.cpTemplate(configTask);
    } catch (e) {
        console.log("Filename: ", __filename, "\n", e.stack);
    }
    return yield Promise.resolve();
}); // job.start()

// =========== [ MODULE EXPORT ] ===========
module.exports = job;
