// =========== [ REQUIRE ] ===========
var co = require("co");
var path = require("path");
var spawn = require("dm-shell").spawn;

// =========== [ MODULE DEFINE ] ===========
var job = {};

// =========== [ job.start() ] ===========
job.start = co.wrap(function*(dirname, taskName) {
    try {
        console.log(dirname);
        var specPath = path.join("tasks", taskName, "test", "test.js");
        var command = "cd " + dirname + "&& node_modules/mocha/bin/mocha --harmony " + specPath + " --require co-mocha --watch";
        spawn(command);


    } catch (e) {
        console.log("Filename: ", __filename, "\n", e.stack);
    }
    return yield Promise.resolve();
}); // job.start()

// =========== [ MODULE EXPORT ] ===========
module.exports = job;
