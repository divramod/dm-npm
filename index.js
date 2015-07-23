var colors = require("colors");
var co = require("co");
require("shelljs/global");

// =========== [ MODULE DEFINE ] ===========
var jobs = {};
var result = {};

// =========== [ job.index() ] ===========
jobs.index = co.wrap(function*() {

    // =========== [ Tasks ] ===========
    result.job = process.env.dmnJob || process.argv[2] || "help";
    if (result.job === "help" || result.job === "-h" || result.job === "-help") {
        yield jobs.help();
    } else if (result.job === "start") {
        yield jobs.start();
    } else if (result.job === "init") {
        var initJob = require("./jobs/init/index.js");
        yield initJob.run(result);
    } else if (result.job === "linkLocal" || result.job === "local") {
        var linkLocalJob = require("./tasks/linkLocal/index.js");
        yield linkLocalJob.run(result);
    } else if (result.job === "installGlobal" || result.job === "global") {
        var linkLocalJob = require("./tasks/installGlobal/index.js");
        yield linkLocalJob.run(result);
    } else {
        yield jobs.help();
        //result.job = "undefined";
        //result.success = true;
        //result.message = "job " + result.job + " not existent!";
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

    //result.success = true;

    // =========== [ JOBS ] ===========
    var command = "cat " + __dirname + "/JOBS.md";
    var jobsDocs = exec(command, {
        silent: true
    }).output;

    // =========== [ TASKS ] ===========
    var command = "cat " + __dirname + "/TASKS.md";
    var tasksDocs = exec(command, {
        silent: true
    }).output;

    // =========== [ HEADER ] ===========
    console.log("dm-npm\n========================================\n".yellow);

    // =========== [ SWITCH ] ===========
    if (process.argv[3] === "jobs") {
        console.log(jobsDocs.green);
    } else if (process.argv[3] === "tasks") {
        console.log(tasksDocs.blue);
    } else {
        console.log(jobsDocs.green);
        console.log(tasksDocs.blue);
    }

    return yield Promise.resolve();
}); // jobs.help

// =========== [ jobs.start ] ===========
jobs.start = co.wrap(function*() {
    result.success = true;

    return yield Promise.resolve();
}); // jobs.start

// =========== [ MODULE EXPORT ] ===========
module.exports = jobs;
