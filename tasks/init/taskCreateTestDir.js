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
job.create = co.wrap(function*(templateDirPath, npmModuleName) {
    console.log("task create test directory started".yellow);

    var taskResult = {};

    // =========== [ copy template directory ] ===========
    cp('-R', templateDirPath + 'test', '.');

    // =========== [ replace npm module name ] ===========
    exec("sed -i 's:NPM_MODULE_NAME:" + npmModuleName + ":g' './test/index.js'");

    // =========== [ test ] ===========
    if (test('-f', "./test/index.js")) {
        taskResult.success = true;
        taskResult.message = "test directory created";;
        console.log(taskResult.message.green);
    } else {
        taskResult.success = false;
        taskResult.message = "test directory not created";;
        console.log(taskResult.message.red);
    }

    console.log("task create test directory done".yellow);
    return yield Promise.resolve(taskResult);
}); // job.create

// =========== [ MODULE EXPORT ] ===========
module.exports = job;
