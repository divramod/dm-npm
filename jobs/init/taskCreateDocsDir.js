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
    console.log("task create docs directory started".yellow);

    var taskResult = {};

    // =========== [ copy template directory ] ===========
    cp('-R', templateDirPath + 'docs', '.');

    // =========== [ test ] ===========
    if (test('-d', "./docs")) {
        taskResult.success = true;
        taskResult.message = "docs directory created";;
        console.log(taskResult.message.green);
    } else {
        taskResult.success = false;
        taskResult.message = "docs directory not created";;
        console.log(taskResult.message.red);
    }

    console.log("task create docs directory done".yellow);
    return yield Promise.resolve(taskResult);
}); // job.create

// =========== [ MODULE EXPORT ] ===========
module.exports = job;
