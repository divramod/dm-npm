// =========== [ REQUIRE ] ===========
var co = require("co");

// =========== [ VAR ] ===========
var task = {};

// =========== [ ASYNC task.start() ] ===========
task.start = co.wrap(function*(p1) {
    try {
        var p1 = p1 || process.argv[3] || undefined;
        return yield Promise.resolve(p1);
    } catch (e) {
        console.log("Filename: ", __filename, "\n", e.stack);
        return yield Promise.resolve(e);
    }
}); // task.start()

// =========== [ MODULE EXPORT ] ===========
module.exports = task;
