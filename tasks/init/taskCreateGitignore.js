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
job.create = co.wrap(function*(templateDirPath) {
    console.log("task create .gitignore started".yellow);

    var taskResult = {};

    cp(templateDirPath + 'gitignore', '.gitignore');

    if (test('-f', ".gitignore")) {
        taskResult.success = true;
        taskResult.message = ".gitignore created";;
        console.log(taskResult.message.green);
    } else {
        taskResult.success = false;
        taskResult.message = ".gitignore not created";;
        console.log(taskResult.message.red);
    }

    console.log("task create gitignore done".yellow);
    return yield Promise.resolve(taskResult);
}); // job.create

// =========== [ MODULE EXPORT ] ===========
module.exports = job;
