// =========== [ REQUIRE ] ===========
var co = require("co");

// =========== [ MODULE DEFINE ] ===========
var task = {};

// =========== [ task.start() ] ===========
task.start = co.wrap(function*(dirname) {
    try {
        var dirname = dirname || process.argv[3] || undefined;
        run(dirname);
    } catch (e) {
        console.log("Filename: ", __filename, "\n", e.stack);
    }
    return yield Promise.resolve();
}); // task.start()

// =========== [ run ] ===========
var run = co.wrap(function*(dirname) {
    console.log(dirname);
}); // run

// =========== [ MODULE EXPORT ] ===========
module.exports = task;
