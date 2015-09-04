// =========== [ REQUIRE ] ===========
var co = require("co");

// =========== [ MODULE DEFINE ] ===========
var task = {};

// =========== [ SYNC task.start() ] ===========
task.start = function(p1) {
    try {
        process.env.debug = false; // for debugging purposes
        var p1 = p1 || process.argv[3] || undefined;
        return run(p1);
    } catch (e) {
        if (process.env.debug === "true") {
            console.log("Filename: ", __filename, "\n", e.stack);
        }
        return e;
    }
}; // task.start()

// =========== [ SYNC run ] ===========
var run = function(p1) {
    try {
        console.log("start TASKNAME");
        return p1;
    } catch (e) {
        console.log("Filename: ", __filename, "\n", e.stack);
        return e;
    }
}; // run

// =========== [ MODULE EXPORT ] ===========
module.exports = task;
