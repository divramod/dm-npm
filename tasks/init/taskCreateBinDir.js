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
    console.log("task create bin directory started".yellow);

    var taskResult = {};

    // =========== [ copy template directory ] ===========
    cp('-R', templateDirPath + 'bin', '.');
    mv("./bin/dm", "./bin/" + npmModuleName);
    mv("./bin/gdm", "./bin/g" + npmModuleName);

    // =========== [ test ] ===========
    if (test('-f', "./bin/" + npmModuleName)) {
        taskResult.success = true;
        taskResult.message = "bin directory created";;
        console.log(taskResult.message.green);
    } else {
        taskResult.success = false;
        taskResult.message = "bin directory not created";;
        console.log(taskResult.message.red);
    }

    console.log("task create bin directory done".yellow);
    return yield Promise.resolve(taskResult);
}); // job.create

// =========== [ MODULE EXPORT ] ===========
module.exports = job;
