// =========== [ REQUIRE ] ===========
var co = require("co");
var spawn = require("dm-shell").spawn;

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
    var command = "cat " + dirname + "/README.md";
    //spawn(command);
    var commandMarkdown = "markdown " + dirname + "/README.md | lynx -stdin";
    spawn(commandMarkdown);

}); // run

// =========== [ MODULE EXPORT ] ===========
module.exports = task;
