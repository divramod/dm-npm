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
    console.log("task npm install started".yellow);

    var taskResult = {};

    exec('npm install', {
        silent: false
    });
    taskResult.success = true;
    taskResult.message = "npm install ran successfully";;
    console.log(taskResult.message.green);

    console.log("task npm install done".yellow);
    return yield Promise.resolve(taskResult);
}); // job.create

// =========== [ MODULE EXPORT ] ===========
module.exports = job;
