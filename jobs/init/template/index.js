var colors = require("colors");
var co = require("co");
require("shelljs/global");
var jobs = {};
var result = {};
var module_path = __dirname;

// =========== [ job.index() ] ===========
jobs.index = co.wrap(function*() {

    // =========== [ get params from user input ] ===========
    result.job = process.env.dmnJob || process.argv[2] || "help";

    // =========== [ help ] ===========
    if (result.job === "help" || result.job === "-h" || result.job === "-help") {
        var task = require("./tasks/help/index.js");
        yield task.start(module_path);
    }
    // =========== [ test ] ===========
    else if (["test", "t", "-t"].indexOf(result.job) > -1) {
        var task = require("./tasks/test/index.js");
        yield task.start();
    }
    // =========== [ help ] ===========
    else {
        var task = require("./tasks/help/index.js");
        yield task.start(module_path);
    }

    return Promise.resolve(result);
}); // job.index()

// =========== [ MODULE EXPORT ] ===========
module.exports = jobs;
