// =========== [ REQUIRE ] ===========
var co = require("co");
var colors = require("colors");
var dmPrompt = require("dm-prompt").Inquirer;
var dmPath = require("dm-path");
var path = require("path");
var dmUtil = require("dm-util");
var path = require("path");
var fs = require("fs");
var spawn = require("dm-shell").spawn;
require("shelljs/global");

// =========== [ MODULE DEFINE ] ===========
var job = {};

// =========== [ job.start() ] ===========
job.start = co.wrap(function*(modulePath) {
    try {
        var modulePath = modulePath || process.argv[3] || pwd();
        modulePath = dmPath.replace(modulePath);
        var configPath = dmPath.replace("~/.dm-npm.json");
        var config = JSON.parse(fs.readFileSync(modulePath + "/package.json", 'utf8'));
        var moduleName = config.name;
        var moduleShortcut = config.shortcut || undefined;
        if (!moduleShortcut) {
            throw new Error("no shortcut defined");
        }

        var message = "Create task for module " + moduleName + " (" + moduleShortcut + ")";
        console.log(message.cyan);

        // =========== [ 1 aks for task name ] ===========
        var taskNameAnswer =
            yield dmPrompt({
                type: "input",
                name: "taskName",
                message: "Please enter the Task Name:"
            });
        var taskName = taskNameAnswer.taskName;

        // =========== [ 2 get all possible task pathes (modules could be exist] ===========
        var possiblePathes = [];
        var modulesPath = path.resolve(modulePath, "modules");
        if (test("-d", modulesPath)) {
            var possiblePathes = ls(modulesPath);
        }
        possiblePathes.push("tasks");

        // =========== [ ask for task path and adapt it ] ===========
        if (possiblePathes.length > 1) {

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
        } else {
            taskPath = path.join("tasks", taskName);
        }
        taskPath = path.join(modulePath, taskPath);

        if (!test("-d", taskPath)) {

            // =========== [ add job to index.js ] ===========
            var replacer = '';
            replacer += "// automatically add tasks here\n";
            replacer += 'tasks.' + taskName + ' = require("./tasks/' + taskName + '/index.js").start;\n';
            sed('-i', /.*automatically add tasks here.*\n/, replacer, path.join(modulePath, "index.js"));

            // =========== [ add task to global.js ] ===========

            var shortcutsAnswer =
                yield dmPrompt({
                    type: "input",
                    name: "shortcuts",
                    message: "Shortcuts. Devide with comma. ie: task1, t1 (taskname is added autom.)"
                });
            var shortcuts = shortcutsAnswer.shortcuts;
            var shortcutsString = "'" + taskName + "'";
            var aliasString = taskName;
            var shortcutsArray = shortcuts.split(",");
            for (var i = 0, l = shortcutsArray.length; i < l; i++) {
                var s = shortcutsArray[i];
                if (s !== "") {
                    shortcutsString += ",'" + s.trim() + "'";
                    aliasString += "|" + s.trim();
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
            sed('-i', /.*automatically add tasks here.*\n/, replacer, path.join(modulePath, "global.js"));

            // =========== [ add task to README.md ] ===========
            var descriptionAnswer =
                yield dmPrompt({
                    type: "input",
                    name: "description",
                    message: "What will the task do?"
                });
            var description = descriptionAnswer.description;
            var replacer = [
                "## Tasks",
                "\n### [" + taskName + "](tasks/" + taskName + "/index.js)",
                "* " + description,
                "\n####" + taskName + " global usage",
                "```",
                moduleShortcut + " [" + aliasString + "]",
                "```",
                "\n####" + taskName + " programmatically usage",
                "```javascript",
                "var " + taskName + ' = require("' + moduleName + '").' + taskName + ';',
                "var " + taskName + 'Result = ' + taskName + '.start();',
                "```",
                "\n####" + taskName + " steps",
                "\n####" + taskName + " features",
                "\n####" + taskName + " config",
                "```javascript",
                "{",
                '    "' + taskName + '": {',
                "    }",
                "}",
                "```\n"
            ].join("\n");
            sed('-i', /.*## Tasks.*\n/, replacer, path.join(modulePath, "README.md"));

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
            var command = "cd " + modulePath + " && " + env["EDITOR"] + " " + path.join(modulePath, "tasks", taskName, "index.js");
            spawn(command);

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
