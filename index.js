var colors = require("colors");
var co = require("co");
require("shelljs/global");
var jobs = {};
var result = {};
var module_path = __dirname;

process.on('exit', function(code) {
    console.log(code);
});
process.on('uncaughtException', function(code) {
    console.log(code);
});

// =========== [ job.index() ] ===========
jobs.index = co.wrap(function*() {
    try {

        // =========== [ get params from user input ] ===========
        result.job = process.env.dmnJob || process.argv[2] || "help";

        // =========== [ help ] ===========
        if (result.job === "help" || result.job === "-h" || result.job === "-help") {
            var task = require("./tasks/help/index.js");
            yield task.start(module_path);
        }
        // =========== [ init ] ===========
        else if (["init", "i", "-i"].indexOf(result.job) > -1) {
            var job = require("./jobs/init/index.js");
            job.run();
        }
        // =========== [ publish ] ===========
        else if (["p", "-p", "publish"].indexOf(result.job) > -1) {
            var job = require("./jobs/publish/index.js");
            yield job.start(module_path);
        }
        // =========== [ test ] ===========
        else if (["test", "t"].indexOf(result.job) > -1) {
            var task = require("./tasks/test/index.js");
            yield task.start();
        }
        // =========== [ link local ] ===========
        else if (["linkLocal", "-l", "l", "local"].indexOf(result.job) > -1) {
            var task = require("./tasks/linkLocal/index.js");
            yield task.run(result);
        }
        // =========== [ install global ] ===========
        else if (["installGlobal", "-g", "g", "global"].indexOf(result.job) > -1) {
            var task = require("./tasks/installGlobal/index.js");
            yield task.run(result);
        }
        // =========== [ bump Version ] ===========
        else if (["bump", "-b", "b"].indexOf(result.job) > -1) {
            var task = require("./tasks/bumpVersion/index.js");
            yield task.start(module_path);
        }
        // =========== [ help ] ===========
        else {
            var task = require("./tasks/help/index.js");
            yield task.start(module_path);
        }
    } catch (e) {
        console.log("Filename: ", __filename, "\n", e.stack);
    }

    return Promise.resolve(result);
}); // job.index()

// =========== [ MODULE EXPORT ] ===========
module.exports = jobs;
