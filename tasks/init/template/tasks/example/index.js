// =========== [ REQUIRE ] ===========
var co = require("co");

// =========== [ MODULE DEFINE ] ===========
var task = {};

// =========== [ SYNC task.start() ] ===========
task.start = function(p1) {
    try {
        process.env.debug = false; // for debugging purposes
        var p1 = p1 || process.argv[3] || undefined;
        return run();
    } catch (e) {
        if (process.env.debug === "true") {
            console.log("Filename: ", __filename, "\n", e.stack);
        }
        return e;
    }
}; // task.start()

// =========== [ SYNC run ] ===========
var run = function() {
    try {
        console.log("start example");
        return "example";
    } catch (e) {
        console.log("Filename: ", __filename, "\n", e.stack);
        return e;
    }
}; // run

// =========== [ ASYNC task.start() ] ===========
task.startAsync = co.wrap(function*(p1) {
    try {
        process.env.debug = false; // for debugging purposes
        var p1 = p1 || process.argv[3] || undefined;
        var result =
            yield runAsync();
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
var runAsync = co.wrap(function*() {
    try {
        console.log("start example");
        return yield Promise.resolve("example");
    } catch (e) {
        console.log("Filename: ", __filename, "\n", e.stack);
        return yield Promise.resolve(e);
    }
}); // runAsync

// =========== [ MODULE EXPORT ] ===========
module.exports = task;
