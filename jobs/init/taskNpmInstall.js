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
    //exec('ls', {
    //silent: false
    //});

    taskResult.success = true;
    taskResult.message = "npm install ran successfully";;
    console.log(taskResult.message.green);
    //if (test('-f', ".npmignore")) {
    //taskResult.success = true;
    //taskResult.message = ".npmignore created";;
    //console.log(taskResult.message.green);
    //} else {
    //taskResult.success = false;
    //taskResult.message = ".npmignore not created";;
    //console.log(taskResult.message.red);
    //}

    console.log("task npm install done".yellow);
    return yield Promise.resolve(taskResult);
}); // job.create

// =========== [ MODULE EXPORT ] ===========
module.exports = job;
