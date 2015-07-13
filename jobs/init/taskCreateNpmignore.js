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
job.create = co.wrap(function*() {
    console.log("task create npmignore started".yellow);

    var taskResult = {};

    exec('touch .npmignore', {
        silent: false
    });

    if (test('-f', ".npmignore")) {
        taskResult.success = true;
        taskResult.message = ".npmignore created";;
        console.log(taskResult.message.green);
    } else {
        taskResult.success = false;
        taskResult.message = ".npmignore not created";;
        console.log(taskResult.message.red);
    }

    console.log("task create npmignore done".yellow);
    return yield Promise.resolve(taskResult);
}); // job.create

// =========== [ MODULE EXPORT ] ===========
module.exports = job;
