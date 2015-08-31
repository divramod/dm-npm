// =========== [ REQUIRE ] ===========
var co = require("co");
var colors = require("colors");
var dmPrompt = require("dm-prompt").Inquirer;
var dmUtil = require("dm-util");
var path = require("path");
require("shelljs/global");

// =========== [ MODULE DEFINE ] ===========
var job = {};

// =========== [ job.start() ] ===========
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
            taskPath = path.join("modules", taskPath, "tasks", taskName);
        } else {
            taskPath = path.join("tasks", taskName);
        }
        taskPath = path.join(process.cwd(), taskPath);

        if (!test("-d", taskPath)) {


            // =========== [ add job to index.js ] ===========
            var replacer = '';
            replacer += "// automatically add tasks here\n";
            replacer += 'tasks.' + taskName + ' = require("./tasks/' + taskName + '/index.js").start;\n';
            sed('-i', /.*automatically add tasks here.*\n/, replacer, "index.js");

            // =========== [ add task to global.js ] ===========

            var shortcutsAnswer =
                yield dmPrompt({
                    type: "input",
                    name: "shortcuts",
                    message: "Shortcuts. Devide with comma. ie: task1, t1 (taskname is added autom.)"
                });
            var shortcuts = shortcutsAnswer.shortcuts;
            var shortcutsString = "'" + taskName + "'";
            var shortcutsArray = shortcuts.split(",");
            for (var i = 0, l = shortcutsArray.length; i < l; i++) {
                var s = shortcutsArray[i];
                if (s !== "") {
                    shortcutsString += ",'" + s.trim() + "'";
                }
            }

            var replacer = [
                "        // automatically add tasks here\n",
                "        // =========== [ " + taskName + " ] ===========",
                '        else if ([' + shortcutsString + '].indexOf(argv2) > -1) {',
                '            var task = require("./tasks/' + taskName + '/index.js");',
                '            yield task.start();',
                '        }',
            ].join("\n");
            sed('-i', /.*automatically add tasks here.*\n/, replacer, "global.js");

            // =========== [ add task to README.md ] ===========
            var descriptionAnswer =
                yield dmPrompt({
                    type: "input",
                    name: "description",
                    message: "What will the task do?"
                });
            var description = descriptionAnswer.description;
            var replacer = [
                "## Tasks\n",
                "### " + taskName,
                "* " + description,
                "* examples ",
                "```javascript",
                "alias " + "" + taskName + " // ",
                "```\n"
            ].join("\n");
            sed('-i', /.*## Tasks.*\n/, replacer, "README.md");

            // =========== [ create task ] ===========
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
            yield dmUtil.cpTemplate(configTask);

        } else {
            var message = "Task path " + taskPath.red + " is already existing. Creation aborted!";
            console.log(message);
        }
    } catch (e) {
        console.log("Filename: ", __filename, "\n", e.stack);
    }
    return yield Promise.resolve();
}); // task.start()

// =========== [ MODULE EXPORT ] ===========
module.exports = job;
