// =========== [ REQUIRE ] ===========
var co = require("co");
var colors = require("colors");
var spawn = require("dm-shell").spawn;
require("shelljs/global");

// =========== [ MODULE DEFINE ] ===========
var job = {};

// =========== [ job.create ] ===========
/**
 * Create file .npmignore if it does not exists
 */
job.create = co.wrap(function*() {
    console.log("task npm install started".yellow);

    spawn("npm install");
    var taskResult = {};

    taskResult.success = true;
    taskResult.message = "npm install ran successfully";;
    console.log(taskResult.message.green);

    console.log("task npm install done".yellow);
    return yield Promise.resolve(taskResult);
}); // job.create

// =========== [ MODULE EXPORT ] ===========
module.exports = job;
