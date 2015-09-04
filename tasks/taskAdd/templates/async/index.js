// =========== [ REQUIRE ] ===========
var co = require("co");

// =========== [ VAR ] ===========
var task = {};

// =========== [ ASYNC task.start() ] ===========
task.start = co.wrap(function*(p1) {
    try {
        process.env.debug = false; // for debugging purposes
        var p1 = p1 || process.argv[3] || undefined;
        var result =
            yield runAsync(p1);
        return yield Promise.resolve(result);
    } catch (e) {
        result.success = false;
        result.error = e;
        if (process.env.debug === "true") {
            console.log("Filename: ", __filename, "\n", e.stack);
        }
        return yield Promise.resolve(e);
    }
}); // task.start()


// =========== [ ASYNC runAsync ] ===========
var runAsync = co.wrap(function*(p1) {
    try {
        console.log("start TASKNAME");
        return yield Promise.resolve(p1);
    } catch (e) {
        console.log("Filename: ", __filename, "\n", e.stack);
        return yield Promise.resolve(e);
    }
}); // runAsync

// =========== [ MODULE EXPORT ] ===========
module.exports = task;
