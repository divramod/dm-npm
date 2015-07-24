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

// =========== [ test ] ===========
// TODO
var test = co.wrap(function*() {
    console.log("test");
    return yield Promise.resolve();
}); // test

// =========== [ runTasks ] ===========
var runTasks = co.wrap(function*(npmModuleName, npmModuleShortcut) {
    //var npmModuleName = args[3];
    //var npmModuleShortcut = args[4];
    var templateDirPath = __dirname + "/template/";

    // =========== [ start ] ===========
    console.log("\njob init started".yellow);

    //var result = {};
    try {

        result.message = "init job";
        result.success = false;
    } catch (e) {
        /* handle error */
        console.log("error", e);
    }

    // =========== [ .npmignore ] ===========
    var npmignoreTask = require("./taskCreateNpmignore.js");
    var npmignoreResult =
        yield npmignoreTask.create(templateDirPath);

    // =========== [ .gitignore ] ===========
    var gitignoreTask = require("./taskCreateGitignore.js");
    var gitignoreResult =
        yield gitignoreTask.create(templateDirPath);

    // =========== [ package.json ] ===========
    var packageJsonTask = require("./taskCreatePackageJson.js");
    var packageJsonResult =
        yield packageJsonTask.create(templateDirPath, npmModuleName, npmModuleShortcut);

    // =========== [ index.js ] ===========
    var indexJsTask = require("./taskCreateIndexJs.js");
    var indexJsResult =
        yield indexJsTask.create(templateDirPath, npmModuleName, npmModuleShortcut);

    // =========== [ README.md ] ===========
    var readmeMdTask = require("./taskCreateReadmeMd.js");
    var readmeMdResult =
        yield readmeMdTask.create(templateDirPath, npmModuleName, npmModuleShortcut);

    // =========== [ test directory ] ===========
    var createTestDirTask = require("./taskCreateTestDir.js");
    var createTestDirResult =
        yield createTestDirTask.create(templateDirPath, npmModuleName);

    // =========== [ bin directory ] ===========
    var createBinDirTask = require("./taskCreateBinDir.js");
    var createBinDirResult =
        yield createBinDirTask.create(templateDirPath, npmModuleName);

    // =========== [ jobs directory ] ===========
    var createJobsDirTask = require("./taskCreateJobsDir.js");
    var createJobsDirResult =
        yield createJobsDirTask.create(templateDirPath, npmModuleName);

    // =========== [ npm install ] ===========
    var npmInstallTask = require("./taskNpmInstall.js");
    var npmInstallResult =
        yield npmInstallTask.create();

    // =========== [ create local link ] ===========
    var createLocalLinkTask = require("./../../tasks/linkLocal/index.js");
    var createLocalLinkResult =
        yield createLocalLinkTask.run();

    // =========== [ done ] ===========
    console.log("init done".yellow);

    return yield Promise.resolve();
}); // runTasks

// =========== [ MODULE EXPORT ] ===========
module.exports = job;
