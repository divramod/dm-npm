/**
 *
 * TODO ask for
 *      git remote repository
 *      module name
 *      module shortcut
 * TODO set git remote
 */

// =========== [ REQUIRE ] ===========
var co = require("co");
var colors = require("colors");
var promptly = require("promptly");
var inquirer = require("inquirer");
require("shelljs/global");

// =========== [ MODULE DEFINE ] ===========
var job = {};

// =========== [ job.run ] ===========
job.run = function() {
    var args = process.argv;
    if (!args[3]) {
        var questions = [{
            type: "input",
            name: "module_name",
            message: "What's your module name"
        }, {
            type: "input",
            name: "module_shortcut",
            message: "What's your module shortcut"
        }];

        inquirer.prompt(questions, function(answers) {
            runTasks(answers.module_name, answers.module_shortcut);
        });
    }
    //return yield Promise.resolve();

}; // job.run

// =========== [ runTasks ] ===========
var runTasks = co.wrap(function*(npmModuleName, npmModuleShortcut) {
    try {

        var templateDirPath = __dirname + "/template/";

        // =========== [ start ] ===========
        console.log("\njob init started".yellow);

        // =========== [ 0. define result ] ===========
        var result = {};
        result.message = "init job";
        result.success = false;

        // =========== [ 1 add .gitignore ] ===========
        var gitignoreTask = require("./taskCreateGitignore.js");
        var gitignoreResult =
            yield gitignoreTask.create(templateDirPath);

        // =========== [ 2 create package.json ] ===========
        var packageJsonTask = require("./taskCreatePackageJson.js");
        var packageJsonResult =
            yield packageJsonTask.create(templateDirPath, npmModuleName, npmModuleShortcut);

        // =========== [ 3 index.js ] ===========
        var indexJsTask = require("./taskCreateIndexJs.js");
        var indexJsResult =
            yield indexJsTask.create(templateDirPath, npmModuleName, npmModuleShortcut);

        // =========== [ 4 global.js ] ===========
        var globalJsTask = require("./taskCreateGlobalJs.js");
        var globalJsResult =
            yield globalJsTask.create(templateDirPath, npmModuleName, npmModuleShortcut);

        // =========== [ 5 README.md ] ===========
        var readmeMdTask = require("./taskCreateReadmeMd.js");
        var readmeMdResult =
            yield readmeMdTask.create(templateDirPath, npmModuleName, npmModuleShortcut);

        // =========== [ 6 todo.md ] ===========
        var todoMdTask = require("./taskCreateTodoMd.js");
        var todoMdResult =
            yield todoMdTask.create(templateDirPath, npmModuleName, npmModuleShortcut);

        // =========== [ 7 test directory ] ===========
        var createTestDirTask = require("./taskCreateTestDir.js");
        var createTestDirResult =
            yield createTestDirTask.create(templateDirPath, npmModuleName);

        // =========== [ 8 bin directory ] ===========
        var createBinDirTask = require("./taskCreateBinDir.js");
        var createBinDirResult =
            yield createBinDirTask.create(templateDirPath, npmModuleName);

        // =========== [ 9 tasks directory ] ===========
        var task = require("./taskCreateTasksDir.js");
        var taskResult =
            yield task.create(templateDirPath, npmModuleName);

        // =========== [ 10 npm install ] ===========
        var npmInstallTask = require("./taskNpmInstall.js");
        var npmInstallResult =
            yield npmInstallTask.create();

        // =========== [ 11 create local link ] ===========
        var createLocalLinkTask = require("./../../tasks/linkLocal/index.js");
        var createLocalLinkResult =
            yield createLocalLinkTask.run();

        // =========== [ done ] ===========
        console.log("init done".yellow);

    } catch (e) {
        console.log("Filename: ", __filename, "\n", e.stack);
    }
    return yield Promise.resolve();
}); // runTasks

// =========== [ MODULE EXPORT ] ===========
module.exports = job;
