// =========== [ REQUIRE ] ===========
var co = require("co");

// =========== [ MODULE DEFINE ] ===========
var task = {};

// =========== [ task.start() ] ===========
task.start = co.wrap(function*(p1) {
    try {
        var p1 = p1 || process.argv[3] || undefined;
        run();
    } catch (e) {
        console.log("Filename: ", __filename, "\n", e.stack);
    }
    return yield Promise.resolve();
}); // task.start()

// =========== [ run ] ===========
var run = co.wrap(function*() {
    console.log("start TASKNAME");
}); // run

// =========== [ MODULE EXPORT ] ===========
module.exports = task;
