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
job.create = co.wrap(function*(templateDirPath, npmModuleName, npmModuleShortcut) {
    console.log("task create package.json started".yellow);

    var taskResult = {};

    var filename = "README.md";

    // =========== [ copy template ] ===========
    cp(templateDirPath + filename, filename);

    // =========== [ replace npm module name ] ===========
    exec("sed -i 's:NPM_MODULE_NAME:" + npmModuleName + ":g' './" + filename + "'");
    exec("sed -i 's:NPM_MODULE_SHORTCUT:" + npmModuleShortcut + ":g' './" + filename + "'");

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

    console.log("task create " + filename + " done".yellow);
    return yield Promise.resolve(taskResult);
}); // job.create

// =========== [ MODULE EXPORT ] ===========
module.exports = job;
