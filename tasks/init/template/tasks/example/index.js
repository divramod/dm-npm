// =========== [ REQUIRE ] ===========
var co = require("co");

// =========== [ MODULE DEFINE ] ===========
var task = {};
var result = {
    "task": "example"
};

// =========== [ task.start() ] ===========
task.start = co.wrap(function*(p1) {
    try {
        process.env.debug = true; // for debugging purposes
        var p1 = p1 || process.argv[3] || undefined; // process arguments for global usage
        run();
    } catch (e) {
        result.success = false;
        result.error = e;
        if (process.env.debug === "true") {
            console.log("Filename: ", __filename, "\n", e.stack);
        }
    }
    return yield Promise.resolve(result);
}); // task.start()

// =========== [ run ] ===========
var run = co.wrap(function*() {
    console.log("start example");
    result.success = false;
}); // run
