/**
 * 
 */

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
job.create = co.wrap(function*(dirPathCode, dirPathLocal, npmModuleName, npmModuleShortcut) {
    console.log("task create local link started".yellow);

    var taskResult = {};

    // =========== [ create local link ] ===========
    var command = 'ls -s ' + dirPathCode + "/bin/" + npmModuleName + " " + dirPathLocal + "/" + npmModuleShortcut;
    console.log(command);
    //exec(command, {
        //silent: false
    //});

    // =========== [ test ] ===========
    if (test('-f', dirPathLocal + "/" + npmModuleShortcut)) {
        taskResult.success = true;
        taskResult.message = "bin directory created";;
        console.log(taskResult.message.green);
    } else {
        taskResult.success = false;
        taskResult.message = "bin directory not created";;
        console.log(taskResult.message.red);
    }

    console.log("task create local link done".yellow);
    return yield Promise.resolve(taskResult);
}); // job.create

// =========== [ MODULE EXPORT ] ===========
module.exports = job;
