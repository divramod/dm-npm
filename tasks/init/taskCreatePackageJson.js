// =========== [ REQUIRE ] ===========
var co = require("co");
var colors = require("colors");
require("shelljs/global");

// =========== [ MODULE DEFINE ] ===========
var job = {};

// =========== [ job.create ] ===========
/**
 * Create file .npmignore if it does not exists
 */
job.create = co.wrap(function*(templateDirPath, npmModuleName, npmModuleShortcut, moduleDescription, githubUsername, author) {
    console.log("task create package.json started".yellow);

    var taskResult = {};
    var filename = "package.json";

    if (!test("-f", filename)) {

        // =========== [ copy template ] ===========
        cp(templateDirPath + filename, filename);

        // =========== [ replace npm module name ] ===========
        exec("sed -i 's:NPM_MODULE_NAME:" + npmModuleName + ":g' './" + filename + "'");
        exec("sed -i 's:NPM_MODULE_SHORTCUT:" + npmModuleShortcut + ":g' './" + filename + "'");
        exec("sed -i 's:NPM_MODULE_DESCRIPTION:" + moduleDescription + ":g' './" + filename + "'");
        exec("sed -i 's:GITHUB_USERNAME:" + githubUsername + ":g' './" + filename + "'");
        exec("sed -i 's:AUTHOR:" + author + ":g' './" + filename + "'");

        // =========== [ TEST ] ===========
        if (test('-f', filename)) {
            taskResult.success = true;
            taskResult.message = filename + " created";;
            console.log(taskResult.message.green);
        } else {
            taskResult.success = false;
            taskResult.message = filename + " not created";;
            console.log(taskResult.message.red);
        }
    } else {
        taskResult.success = false;
        taskResult.message = filename + " already existent, not created";;
        console.log(taskResult.message.red);
    }

    var message = "task create " + filename + " done";
    console.log(message);

    return yield Promise.resolve(taskResult);
}); // job.create

// =========== [ MODULE EXPORT ] ===========
module.exports = job;
