// =========== [ REQUIRE ] ===========
var co = require("co");
var dmPrompt = require("dm-prompt").Inquirer;
var dmPath = require("dm-path");
var spawn = require("dm-shell").spawn;
require('shelljs/global');

// =========== [ MODULE DEFINE ] ===========
var task = {};

// =========== [ task.start() ] ===========
task.start = co.wrap(function*(modulePath) {
    try {
        var modulePath = modulePath || process.argv[3] || undefined;
        process.stdout.write('\033c');
        run(modulePath);
    } catch (e) {
        console.log("Filename: ", __filename, "\n", e.stack);
    }
    return yield Promise.resolve();
}); // task.start()

var run = co.wrap(function*(modulePath) {
    console.log(modulePath.red);
    var tasks = ls(modulePath + "/tasks");
    tasks.unshift("docs".yellow);
    // add config
    var moduleName = modulePath.substring(modulePath.lastIndexOf("/") + 1, modulePath.length);
    var configPath = dmPath.replace("~/." + moduleName + ".json");
    if (test("-f", configPath)) {
        tasks.unshift("config".magenta);
    }
    tasks.unshift("quit".green);
    // ask what to do
    var promptTaskAnswer =
        yield dmPrompt({
            type: "list",
            name: "promptTask",
            message: "Which tasks do you want to run?",
            choices: tasks
        });
    var promptTask = promptTaskAnswer.promptTask;
    if (promptTask === "docs".yellow) {
        process.stdout.write('\033c');
        yield runDocs(modulePath);
        process.stdout.write('\033c');
        yield run(modulePath);
    } else if (promptTask === "config".magenta) {
        process.stdout.write('\033c');
        spawn("vim " + configPath);
        yield run(modulePath);
    } else if (promptTask !== "quit".green) {
        process.stdout.write('\033c');
        yield require(modulePath + "/tasks/" + promptTask + "/index.js").start();
        yield run(modulePath);
    }

}); // task.start()

// =========== [ var runDocs ] ===========
var runDocs = co.wrap(function*(modulePath) {
    process.stdout.write('\033c');
    console.log(modulePath.red);
    //var tasks = ls(modulePath + "/tasks/*.md");
    var tasks = find(modulePath).filter(function(file) {
        if (file.indexOf("node_modules") > -1) {
            return false;
        } else {
            return file.match(/\.md$/);
        }
    });
    tasks.unshift("quit".green);
    var promptTaskAnswer =
        yield dmPrompt({
            type: "list",
            name: "promptTask",
            message: "Which doc do you want to edit?",
            choices: tasks
        });
    var promptTask = promptTaskAnswer.promptTask;
    if (promptTask !== "quit".green) {
        process.stdout.write('\033c');
        var command = "vim " + promptTask;
        var spawn = require('child_process').spawnSync;
        var myProcess = spawn('sh', ['-c', command], {
            stdio: 'inherit'
        });
        yield runDocs(modulePath);
    }

}); // var runDocs

// =========== [ MODULE EXPORT ] ===========
module.exports = task;
