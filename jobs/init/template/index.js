/**
 * NPM_MODULE_NAME
 */

// =========== [ REQUIRE ] ===========
var co = require("co");
var colors = require("colors");

// =========== [ MODULE DEFINE ] ===========
var jobs = {};
var result = {};

// =========== [ job.index() ] ===========
jobs.index = co.wrap(function*() {

    // =========== [ Tasks ] ===========
    result.job = process.env.dmnJob || process.argv[2] || "help";
    if (result.job === "help") {
        yield jobs.help();
    } else if (result.job === "start") {
        yield jobs.start();
    } else if (result.job === "job") {
        var jobJob = require("./jobs/job/index.js");
        yield jobJob.run(result);
    } else {
        result.job = "undefined";
        result.success = true;
        result.message = "job " + result.job + " not existent!";
    }

    // =========== [ Logging ] ===========
    if (result.success === true) {
        result.message = result.job + " succeeded!";
        //console.log(result.message.green);
    } else {
        console.log("\n");
        console.log(result.message.red);
        console.log("\n");
    }

    return Promise.resolve(result);
}); // job.index()

// =========== [ jobs.help ] ===========
jobs.help = co.wrap(function*() {
    result.success = true;
    console.log("Help for ".blue);
    return yield Promise.resolve();
}); // jobs.help

// =========== [ jobs.start ] ===========
jobs.start = co.wrap(function*() {
    result.success = true;

    return yield Promise.resolve();
}); // jobs.start

// =========== [ MODULE EXPORT ] ===========
module.exports = jobs;
