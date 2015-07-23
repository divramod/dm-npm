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
require("shelljs/global");

// =========== [ MODULE DEFINE ] ===========
var job = {};

// =========== [ job.run ] ===========
job.run = co.wrap(function* initRun(result) {
    var args = process.argv;

    // =========== [ proof for correct parameters set ] ===========
    var npmModuleNamePassed = true;
    var npmModuleShortcutPassed = true;

    if (!args[3]) {
        npmModuleNamePassed = false;
        console.log("bla");
        console.log("You forgat to pass a module name!".red);
        console.log('For example: dmn init "YOUR_MODULE_NAME_HERE" "YOUR_MODULE_SHORTCUT_HERE"'.blue);

        promptly.prompt('Name: ', function(err, value) {
            // err is always null in this case, because no validators are set 
            console.log(value);
        });

    }

    if (!args[4]) {
        npmModuleShortcutPassed = false;
        console.log("You forgat to pass a module shortcut!".red);
        console.log('For example: dmn init "YOUR_MODULE_NAME_HERE" "YOUR_MODULE_SHORTCUT_HERE"'.blue);
    }

    if (npmModuleNamePassed && npmModuleShortcutPassed) {

        var npmModuleName = args[3];
        var npmModuleShortcut = args[4];
        var templateDirPath = __dirname + "/template/";

        // =========== [ start ] ===========
        console.log("\njob init started".yellow);

        result.message = "init job";
        result.success = false;

        //// =========== [ .npmignore ] ===========
        //var npmignoreTask = require("./taskCreateNpmignore.js");
        //var npmignoreResult =
            //yield npmignoreTask.create(templateDirPath);

        //// =========== [ .gitignore ] ===========
        //var gitignoreTask = require("./taskCreateGitignore.js");
        //var gitignoreResult =
            //yield gitignoreTask.create(templateDirPath);

        //// =========== [ package.json ] ===========
        //var packageJsonTask = require("./taskCreatePackageJson.js");
        //var packageJsonResult =
            //yield packageJsonTask.create(templateDirPath, npmModuleName, npmModuleShortcut);

        //// =========== [ index.js ] ===========
        //var indexJsTask = require("./taskCreateIndexJs.js");
        //var indexJsResult =
            //yield indexJsTask.create(templateDirPath, npmModuleName, npmModuleShortcut);

        //// =========== [ README.md ] ===========
        //var readmeMdTask = require("./taskCreateReadmeMd.js");
        //var readmeMdResult =
            //yield readmeMdTask.create(templateDirPath, npmModuleName, npmModuleShortcut);

        //// =========== [ test directory ] ===========
        //var createTestDirTask = require("./taskCreateTestDir.js");
        //var createTestDirResult =
            //yield createTestDirTask.create(templateDirPath, npmModuleName);

        //// =========== [ bin directory ] ===========
        //var createBinDirTask = require("./taskCreateBinDir.js");
        //var createBinDirResult =
            //yield createBinDirTask.create(templateDirPath, npmModuleName);

        //// =========== [ jobs directory ] ===========
        //var createJobsDirTask = require("./taskCreateJobsDir.js");
        //var createJobsDirResult =
            //yield createJobsDirTask.create(templateDirPath, npmModuleName);

        //// =========== [ npm install ] ===========
        //var npmInstallTask = require("./taskNpmInstall.js");
        //var npmInstallResult =
            //yield npmInstallTask.create();

        // =========== [ create local link ] ===========
        var createLocalLinkTask = require("./../../tasks/linkLocal/index.js");
        var createLocalLinkResult =
            yield createLocalLinkTask.run();

        // =========== [ done ] ===========
        console.log("init done".yellow);
    }

    return yield Promise.resolve();
}); // job.run

// =========== [ MODULE EXPORT ] ===========
module.exports = job;
