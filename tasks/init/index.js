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
var dmFile = require("dm-file");
require("shelljs/global");

// =========== [ MODULE DEFINE ] ===========
var job = {};

// =========== [ job.run ] ===========
job.run = co.wrap(function*() {
    var result = "";
    try {
        var args = process.argv;
        // =========== [ 1 add .gitignore ] ===========
        var config = dmFile.getJsonFromFile("~/.dm-npm.json");

        var defaultUser = "";
        if (config.init.github.username) {
            var githubUsername = config.init.github.username;
            defaultUser = " [Default: " + config.init.github.username + "]";
        }

        var questions = [{
            type: "input",
            name: "module_name",
            message: "What's your module name?"
        }, {
            type: "input",
            name: "module_shortcut",
            message: "What's your module shortcut?"
        }, {
            type: "input",
            name: "module_description",
            message: "What's your module description?"
        }, {
            type: "input",
            name: "github_username",
            message: "What's your github username?" + defaultUser
        }];

        inquirer.prompt(questions, function(answers) {
            if (answers.github_username === "") {
                if (githubUsername) {
                    answers.github_username = githubUsername;
                } else {
                    answers.github_username = undefined;
                    console.log("Error: you cannot leave the username blank!".red);
                }
            }
            if (answers.github_username) {
                runTasks(answers.module_name, answers.module_shortcut, answers.module_description, answers.github_username, config);
            }
        });
    } catch (e) {
        console.log("Filename: ", __filename, "\n", e.stack);
        result = e;
    }
    return yield Promise.resolve(result);
}); // job.run



// =========== [ runTasks ] ===========
var runTasks = co.wrap(function*(npmModuleName, npmModuleShortcut, moduleDescription, githubUsername, config) {
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
        var author = config.init.github.author || "";
        var packageJsonTask = require("./taskCreatePackageJson.js");
        var packageJsonResult =
            yield packageJsonTask.create(templateDirPath, npmModuleName, npmModuleShortcut, moduleDescription, githubUsername, author);

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
            yield readmeMdTask.create(templateDirPath, npmModuleName, npmModuleShortcut, moduleDescription);

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


        // =========== [ 10 npm install ] ===========
        var npmInstallTask = require("./taskNpmInstall.js");
        var npmInstallResult =
            yield npmInstallTask.create();

        // =========== [ 11 create local link ] ===========
        var createLocalLinkTask = require("./../../tasks/linkLocal/index.js");
        var createLocalLinkResult =
            yield createLocalLinkTask.start();

        // =========== [ 9 tasks directory ] ===========
        var task = require("./taskCreateTasksDir.js");
        var taskResult =
            yield task.create(templateDirPath, npmModuleName);

        // =========== [ done ] ===========
        console.log("init done".yellow);

    } catch (e) {
        console.log("Filename: ", __filename, "\n", e.stack);
    }
    return yield Promise.resolve();
}); // runTasks

// =========== [ MODULE EXPORT ] ===========
module.exports = job;
